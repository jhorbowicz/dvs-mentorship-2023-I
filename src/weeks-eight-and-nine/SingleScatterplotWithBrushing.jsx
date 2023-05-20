/* eslint-disable jsx-a11y/no-static-element-interactions */
import { scaleLinear, extent, max, scaleOrdinal } from "d3";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { Grid } from "@visx/grid";

import { useChartLayout } from "../hooks/useChartLayout";
import { useState } from "react";
const chartColors = [
  "#0077c8",
  "#68b828",
  "#f7bc05",
  "#009cda",
  "#48a9a6",
  "#f26c21",
  "#ed1c24",
  "#8c4799",
  "#a05c15",
  "#7e7e7e",
];

function SingleScatterplotWithBrushing({ dataSet }) {
  const [brushState, setBrushState] = useState({
    action: "uninitialized",
  });

  const startSelection = ({ nativeEvent }) => {
    if (brushState.action === "uninitialized") {
      setBrushState({
        action: "selection started",
        x0: nativeEvent.offsetX,
        x1: nativeEvent.offsetX,
        y0: nativeEvent.offsetY,
        y1: nativeEvent.offsetY,
      });
    }
  };

  const endSelection = ({ nativeEvent }) => {
    if (brushState.action === "selecting") {
      setBrushState((prev) => ({
        ...prev,
        action: "selected",
        x1: nativeEvent.offsetX,
        y1: nativeEvent.offsetY,
      }));
    } else if (brushState.action === "selection started") {
      clearSelection();
    }
  };
  const changeSelection = ({ nativeEvent }) => {
    if (["selection started", "selecting"].includes(brushState.action)) {
      setBrushState({
        ...brushState,
        action: "selecting",
        x1: nativeEvent.offsetX,
        y1: nativeEvent.offsetY,
      });
    }
  };
  const clearSelection = () =>
    setBrushState({
      action: "uninitialized",
    });

  const xAccessor = (d) => d["Displacement"];
  const yAccessor = (d) => d["Weight_in_lbs"];
  const colorAccessor = (d) => d["Origin"];
  const chartDimensions = useChartLayout(400, 250);
  const {
    wrapperHeight,
    wrapperWidth,
    chartWidth,
    leftMargin,
    chartHeight,
    topMargin,
  } = chartDimensions;

  const hasBothXandY = (d) => xAccessor(d) && yAccessor(d);

  const yScale = scaleLinear()
    .domain([0, max(dataSet, yAccessor) + 5])
    .range([chartHeight, 0]);

  const xScale = scaleLinear()
    .domain(extent(dataSet, xAccessor))
    .nice()
    .range([0, chartWidth]);

  const colorScale = scaleOrdinal()
    .domain([...new Set(dataSet.map(colorAccessor))])
    .range(chartColors);

  const { x0, x1, y0, y1 } = brushState;

  const selectionInDomain = {
    minX: xScale.invert(Math.min(x0, x1)),
    maxX: xScale.invert(Math.max(x0, x1)),
    minY: yScale.invert(Math.max(y0, y1)),
    maxY: yScale.invert(Math.min(y0, y1)),
  };

  const isPointSelected = (datum) => {
    if (!["selecting", "selected"].includes(brushState.action)) {
      return true;
    }
    const datumX = xAccessor(datum);
    const datumY = yAccessor(datum);
    return (
      datumX > selectionInDomain.minX &&
      datumX < selectionInDomain.maxX &&
      datumY > selectionInDomain.minY &&
      datumY < selectionInDomain.maxY
    );
  };

  return (
    <section
      className="relative"
      style={{
        height: wrapperHeight + 80,
      }}
    >
      <svg
        viewBox={`0 0 ${wrapperWidth} ${wrapperHeight}`}
        width={wrapperWidth}
        height={wrapperHeight}
        className="m-10 absolute"
      >
        <g transform={`translate(${leftMargin}, ${topMargin})`}>
          <Grid
            xScale={xScale}
            yScale={yScale}
            width={chartWidth}
            height={chartHeight}
          />
        </g>
        <g transform={`translate(${leftMargin})`}>
          {dataSet.filter(hasBothXandY).map((dataEntry, i) => {
            return (
              <circle
                key={`${dataEntry}-${i}`}
                r="2"
                cx={xScale(xAccessor(dataEntry))}
                cy={yScale(yAccessor(dataEntry))}
                opacity={1}
                fill={
                  isPointSelected(dataEntry)
                    ? colorScale(colorAccessor(dataEntry))
                    : "grey"
                }
                fillOpacity={1}
              />
            );
          })}
        </g>
        {["selecting", "selected"].includes(brushState.action) ? (
          <g transform={`translate(${leftMargin}, ${topMargin})`}>
            <rect
              x={Math.min(brushState.x0, brushState.x1)}
              y={Math.min(brushState.y0, brushState.y1)}
              width={Math.abs(brushState.x1 - brushState.x0)}
              height={Math.abs(brushState.y1 - brushState.y0)}
              fillOpacity="0.5"
              fill="lavender"
              stroke="violet"
              strokeWidth={2}
            />
          </g>
        ) : null}
        <g transform={`translate(${leftMargin}, ${topMargin})`}>
          <AxisLeft scale={yScale} />
        </g>
        <g transform={`translate(${leftMargin}, ${chartHeight + topMargin})`}>
          <AxisBottom scale={xScale} />
        </g>
      </svg>
      <div
        className="absolute"
        style={{
          width: chartWidth,
          height: chartHeight,
          top: "40px",
          left: "90px",
          cursor: "crosshair",
        }}
        onMouseDown={startSelection}
        onMouseMove={changeSelection}
        onMouseUp={endSelection}
        onDoubleClick={clearSelection}
      ></div>
    </section>
  );
}

export default SingleScatterplotWithBrushing;
