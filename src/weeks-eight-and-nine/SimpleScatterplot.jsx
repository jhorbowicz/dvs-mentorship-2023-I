import { scaleLinear, extent, max, scaleOrdinal } from "d3";

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

function SimpleScatterplot({
  dataset,
  xAccessor,
  yAccessor,
  colorAccessor,
  chartTopEdge,
  chartBottomEdge,
  chartRightEdge,
  chartLeftEdge,
}) {
  const hasBothXandY = (d) => xAccessor(d) && yAccessor(d);

  const yScale = scaleLinear()
    .domain([0, max(dataset, yAccessor) + 5])
    .range([chartBottomEdge, chartTopEdge]);

  const xScale = scaleLinear()
    .domain(extent(dataset, xAccessor))
    .nice()
    .range([chartLeftEdge, chartRightEdge]);

  const colorScale = scaleOrdinal()
    .domain([...new Set(dataset.map(colorAccessor))])
    .range(chartColors);

  return (
    <>
      {dataset.filter(hasBothXandY).map((dataEntry, i) => {
        return (
          <circle
            key={`dataEntry.name ${i}`}
            r="2"
            cx={xScale(xAccessor(dataEntry))}
            cy={yScale(yAccessor(dataEntry))}
            opacity={1}
            fill={colorScale(colorAccessor(dataEntry))}
            fillOpacity={1}
          />
        );
      })}
    </>
  );
}

export default SimpleScatterplot;
