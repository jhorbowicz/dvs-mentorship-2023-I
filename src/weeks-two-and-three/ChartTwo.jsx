import { useMemo } from "react";
import { useTooltip, Tooltip } from "@visx/tooltip";
import { scaleLinear, extent, max, schemeCategory10, scaleOrdinal } from "d3";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { Grid } from "@visx/grid";
import { LegendOrdinal } from "@visx/legend";
import ScatterplotTwo from "./ScatterplotTwo";

export default function ChartTwo({ dataset, width, height }) {
  const xAccessor = (d) => d["Horsepower"];
  const yAccessor = (d) => d["Miles_per_Gallon"];
  const originAccessor = (d) => d["Origin"];
  const nameAccessor = (d) => d["Name"];

  const yScaleWidth = 50;
  const rightPadding = 10;
  const chartWidth = width - yScaleWidth - rightPadding;

  const xScaleHeight = 30;
  const chartHeight = height - xScaleHeight;

  const yScale = useMemo(() => {
    return scaleLinear()
      .domain([0, max(dataset, yAccessor) + 5])
      .range([chartHeight, 0]);
  }, [dataset, chartHeight]);

  const xScale = useMemo(() => {
    return scaleLinear()
      .domain(extent(dataset, xAccessor))
      .nice()
      .range([0, chartWidth]);
  }, [dataset, chartWidth]);

  const colorScale = useMemo(() => {
    const uniqueOrigins = [...new Set(dataset.map(originAccessor))];
    return scaleOrdinal().domain(uniqueOrigins).range(schemeCategory10);
  }, [dataset]);

  const hasBothXandY = (d) => xAccessor(d) && yAccessor(d);

  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip();

  const displayTooltip = (pointData) => {
    showTooltip({
      tooltipLeft: xScale(pointData.x),
      tooltipTop: yScale(pointData.y),
      tooltipData: pointData,
    });
  };

  return (
    <div className="relative" style={{ maxWidth: width }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        className="m-10"
      >
        <g transform={`translate(${yScaleWidth}, 0)`}>
          <Grid
            xScale={xScale}
            yScale={yScale}
            width={chartWidth}
            height={chartHeight}
          />
        </g>
        <g transform={`translate(${yScaleWidth}, 0)`}>
          <AxisLeft scale={yScale} />
        </g>
        <g transform={`translate(${yScaleWidth}, 0)`}>
          <ScatterplotTwo
            data={dataset.filter(hasBothXandY)}
            xScale={xScale}
            yScale={yScale}
            xAccessor={xAccessor}
            yAccessor={yAccessor}
            nameAccessor={nameAccessor}
            colorAccessor={originAccessor}
            colorScale={colorScale}
            onMouseOverHandler={displayTooltip}
            onMouseOutHandler={hideTooltip}
          />
        </g>
        <g transform={`translate(${yScaleWidth}, ${chartHeight})`}>
          <AxisBottom scale={xScale} />
        </g>
      </svg>
      <LegendOrdinal scale={colorScale} className="absolute top-10 right-4" />
      {tooltipOpen ? (
        <Tooltip
          key={Math.random()}
          top={tooltipTop}
          left={tooltipLeft}
          className="flex flex-col"
        >
          <h2>
            <strong>{tooltipData.name}</strong>
          </h2>
          <span>
            Horsepower: <strong>{tooltipData.x}</strong>
          </span>
          <span>
            Miles per Gallon: <strong>{tooltipData.y}</strong>
          </span>
          <span>
            Origin: <strong>{tooltipData.origin}</strong>
          </span>
        </Tooltip>
      ) : null}
    </div>
  );
}
