import { scaleLinear, scaleOrdinal, max, extent, schemeCategory10 } from "d3";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { Grid } from "@visx/grid";
import { LegendOrdinal } from "@visx/legend";

export default function BaseChart({
  dataset,
  xAccessorKey,
  yAccessorKey,
  colorAccessorKey,
  chartDimensions,
  Chart,
  chartOwnProps = {},
  displayLegend = true,
}) {
  const xAccessor = (d) => d[xAccessorKey];
  const yAccessor = (d) => d[yAccessorKey];
  const colorAccessor = (d) => d[colorAccessorKey];
  const { wrapperHeight, wrapperWidth, leftMargin, chartHeight, chartWidth } =
    chartDimensions;

  const yScale = scaleLinear()
    .domain([0, max(dataset, yAccessor) + 5])
    .range([chartHeight, 0]);

  const xScale = scaleLinear()
    .domain(extent(dataset, xAccessor))
    .nice()
    .range([0, chartWidth]);

  const colorScale = scaleOrdinal()
    .domain([...new Set(dataset.map(colorAccessor))])
    .range(schemeCategory10);

  const hasBothXandY = (d) => xAccessor(d) && yAccessor(d);

  return (
    <div className="relative" style={{ maxWidth: wrapperWidth }}>
      <svg
        viewBox={`0 0 ${wrapperWidth} ${wrapperHeight}`}
        width={wrapperWidth}
        height={wrapperHeight}
        className="m-10"
      >
        <g transform={`translate(${leftMargin}, 0)`}>
          <Grid
            xScale={xScale}
            yScale={yScale}
            width={chartWidth}
            height={chartHeight}
          />
        </g>
        <g transform={`translate(${leftMargin}, 0)`}>
          <AxisLeft scale={yScale} />
        </g>
        <g transform={`translate(${leftMargin}, 0)`}>
          <Chart
            data={dataset.filter(hasBothXandY)}
            xScale={xScale}
            yScale={yScale}
            xAccessor={xAccessor}
            yAccessor={yAccessor}
            colorAccessor={colorAccessor}
            colorScale={colorScale}
            {...chartOwnProps}
          />
        </g>
        <g transform={`translate(${leftMargin}, ${chartHeight})`}>
          <AxisBottom scale={xScale} />
        </g>
      </svg>
      {!!displayLegend && (
        <LegendOrdinal scale={colorScale} className="absolute top-10 right-4" />
      )}
    </div>
  );
}
