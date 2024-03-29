import { scaleLinear, scaleOrdinal, max, extent, schemeCategory10 } from "d3";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { Grid } from "@visx/grid";

export default function BaseChart({
  dataset,
  xAccessorKey,
  yAccessorKey,
  colorAccessorKey,
  chartDimensions,
  Chart,
  chartOwnProps = {},
}) {
  const xAccessor = (d) => d[xAccessorKey];
  const yAccessor = (d) => d[yAccessorKey];
  const colorAccessor = (d) => d[colorAccessorKey];
  const { leftMargin, chartHeight, chartWidth, topMargin } = chartDimensions;

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
    <>
      <g transform={`translate(${leftMargin}, ${topMargin})`}>
        <Grid
          xScale={xScale}
          yScale={yScale}
          width={chartWidth}
          height={chartHeight}
        />
      </g>
      <g transform={`translate(${leftMargin}, ${topMargin})`}>
        <AxisLeft scale={yScale} />
      </g>
      <g transform={`translate(${leftMargin}, ${topMargin})`}>
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
      <g transform={`translate(${leftMargin}, ${chartHeight + topMargin})`}>
        <AxisBottom scale={xScale} />
      </g>
    </>
  );
}
