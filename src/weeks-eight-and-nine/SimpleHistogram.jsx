import { bin, scaleLinear, extent, area, curveBasis } from "d3";

function SimpleHistogram({
  dataset,
  xAccessor,
  chartTopEdge,
  chartBottomEdge,
  chartRightEdge,
  chartLeftEdge,
}) {
  const xScale = scaleLinear()
    .domain(extent(dataset, xAccessor))
    .nice()
    .range([chartRightEdge, chartLeftEdge]);

  const histogramGenerator = bin()
    .domain(xScale.domain())
    .value(xAccessor)
    .thresholds(15);

  const histogramBins = histogramGenerator(dataset);

  const histogramYScale = scaleLinear()
    .domain(extent(histogramBins, (d) => d.length))
    .range([chartBottomEdge - 5, chartTopEdge]);

  const histogram = area()
    .x((d) => xScale((d.x0 + d.x1) / 2))
    .y0(chartBottomEdge - 5)
    .y1((d) => histogramYScale(d.length))
    .curve(curveBasis);

  return (
    <>
      <path
        d={histogram(histogramBins)}
        fill="#48a9a6bb"
        stroke="#0077c8"
        strokeWidth={2}
      />
    </>
  );
}

export default SimpleHistogram;
