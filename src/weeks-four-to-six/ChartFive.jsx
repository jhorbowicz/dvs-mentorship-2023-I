import { LegendOrdinal } from "@visx/legend";
import { bin, scaleLinear, extent, area, curveBasis } from "d3";
import ScatterplotOne from "../week-one/ScatterplotOne";
import BaseChart from "../components/BaseChart";
import { useChartLayout } from "../hooks/useChartLayout";
import { useLegendColorScale } from "../hooks/useLegendColorScale";

export default function ChartFive({ dataset }) {
  const marginalHistogramMargin = 5;
  const marginalHistogramHeight = 45;
  const chartDimensions = useChartLayout(
    800,
    450,
    marginalHistogramMargin + marginalHistogramHeight
  );
  const { wrapperHeight, wrapperWidth, chartWidth, leftMargin } =
    chartDimensions;
  const colorScale = useLegendColorScale(dataset, (d) => d["Origin"]);
  const xAccessor = (d) => d["Horsepower"];

  const xScale = scaleLinear()
    .domain(extent(dataset, xAccessor))
    .nice()
    .range([0, chartWidth]);

  const topHistogramGenerator = bin()
    .domain(xScale.domain())
    .value(xAccessor)
    .thresholds(30);

  const topHistogramBins = topHistogramGenerator(dataset);

  const topHistogramYScale = scaleLinear()
    .domain(extent(topHistogramBins, (d) => d.length))
    .range([marginalHistogramHeight, 0]);

  const marginalHistogram = area()
    .x((d) => xScale((d.x0 + d.x1) / 2))
    .y0(marginalHistogramHeight)
    .y1((d) => topHistogramYScale(d.length))
    .curve(curveBasis);

  return (
    <div className="relative" style={{ maxWidth: wrapperWidth }}>
      <svg
        viewBox={`0 0 ${wrapperWidth} ${wrapperHeight}`}
        width={wrapperWidth}
        height={wrapperHeight}
        className="m-10"
      >
        <g transform={`translate(${leftMargin})`}>
          <path d={marginalHistogram(topHistogramBins)} fill="lavender" />
        </g>
        <BaseChart
          dataset={dataset}
          xAccessorKey="Horsepower"
          yAccessorKey="Miles_per_Gallon"
          colorAccessorKey="Origin"
          Chart={ScatterplotOne}
          chartDimensions={chartDimensions}
        />
      </svg>
      <LegendOrdinal scale={colorScale} className="absolute top-12 right-4" />
    </div>
  );
}
