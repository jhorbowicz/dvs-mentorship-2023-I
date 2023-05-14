import { useMemo } from "react";
import { useTooltip, Tooltip } from "@visx/tooltip";
import { scaleLinear, extent, max } from "d3";
import { LegendOrdinal } from "@visx/legend";
import ScatterplotTwo from "./ScatterplotTwo";
import BaseChart from "../components/BaseChart";
import { useChartLayout } from "../hooks/useChartLayout";
import { useLegendColorScale } from "../hooks/useLegendColorScale";

export default function ChartTwo({ dataset }) {
  const xAccessor = (d) => d["Horsepower"];
  const yAccessor = (d) => d["Miles_per_Gallon"];
  const nameAccessor = (d) => d["Name"];

  const chartDimensions = useChartLayout();
  const { wrapperHeight, wrapperWidth } = chartDimensions;
  const colorScale = useLegendColorScale(dataset, (d) => d["Origin"]);

  const yScale = useMemo(() => {
    return scaleLinear()
      .domain([0, max(dataset, yAccessor) + 5])
      .range([chartDimensions.chartHeight, 0]);
  }, [dataset, chartDimensions.chartHeight]);

  const xScale = useMemo(() => {
    return scaleLinear()
      .domain(extent(dataset, xAccessor))
      .nice()
      .range([0, chartDimensions.chartWidth]);
  }, [dataset, chartDimensions.chartWidth]);

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
    <div className="relative" style={{ maxWidth: wrapperWidth }}>
      <svg
        viewBox={`0 0 ${wrapperWidth} ${wrapperHeight}`}
        width={wrapperWidth}
        height={wrapperHeight}
        className="m-10"
      >
        <BaseChart
          dataset={dataset}
          xAccessorKey="Horsepower"
          yAccessorKey="Miles_per_Gallon"
          colorAccessorKey="Origin"
          Chart={ScatterplotTwo}
          chartOwnProps={{
            nameAccessor,
            onMouseOverHandler: displayTooltip,
            onMouseOutHandler: hideTooltip,
          }}
          chartDimensions={chartDimensions}
        />
      </svg>
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
      <LegendOrdinal scale={colorScale} className="absolute top-10 right-4" />
    </div>
  );
}
