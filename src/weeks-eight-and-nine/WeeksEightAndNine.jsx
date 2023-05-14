import { Link } from "react-router-dom";
import {
  bin,
  scaleLinear,
  extent,
  area,
  curveBasis,
  max,
  scaleOrdinal,
} from "d3";

import MatrixDraft from "./MatrixDraft";
import { useData } from "../hooks/useData";

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

function WeeksEightAndNine() {
  const dataSet = useData(
    "https://raw.githubusercontent.com/vega/vega-datasets/next/data/cars.json"
  );
  // select what data goes on which column and row

  /*
      | Miles per Galon | Historgram 1    | Scatterplot 1   | Scatterplot 2   | Scatterplot 3   | Scatterplot 4   |
      | Displacement    | Scatterplot 5   | Historgram 2    | Scatterplot 6   | Scatterplot 7   | Scatterplot 8   |
      | Horsepower      | Scatterplot 9   | Scatterplot 10  | Historgram 3    | Scatterplot 11  | Scatterplot 12  |
      | Weight          | Scatterplot 13  | Scatterplot 14  | Scatterplot 15  | Historgram 4    | Scatterplot 16  |
      | 0-60            | Scatterplot 17  | Scatterplot 18  | Scatterplot 19  | Scatterplot 20  | Historgram 5    |
              X         | Miles per Galon | Displacement    | Horsepower      | Weight          | 0-60            |

      Row I:
      Histogram 1 -> Count(Miles per Galon)
      Scatterplot 1 -> Displacement(Miles per Galon)
      Scatterplot 2 -> Horsepower(Miles per Galon)
      Scatterplot 3 -> Weight(Miles per Galon)
      Scatterplot 4 -> 0-60(Miles per Galon)
      Row II:
      Scatterplot 5 -> Miles per Galon(Displacement)
      Histogram 2 -> Count(Displacement)
      Scatterplot 6 -> Horsepower(Displacement)
      Scatterplot 7 -> Weight(Displacement)
      Scatterplot 8 -> 0-60(Displacement)
      Row III:
      Scatterplot 9 -> Miles per Galon(Horsepower)
      Scatterplot 10 -> Displacement(Horsepower)
      Histogram 3 -> Count(Horsepower)
      Scatterplot 11 -> Weight(Horsepower)
      Scatterplot 12 -> 0-60(Horsepower)
      Row IV:
      Scatterplot 13 -> Miles per Galon(Weight)
      Scatterplot 14 -> Displacement(Weight)
      Scatterplot 15 -> Horsepower(Weight)
      Histogram 4 -> Count(Weight)
      Scatterplot 16 -> 0-60(Weight)
      Row V:
      Scatterplot 17 -> Miles per Galon(0-60)
      Scatterplot 18 -> Displacement(0-60)
      Scatterplot 19 -> Horsepower(0-60)
      Scatterplot 20 -> Weight(0-60)
      Histogram 5 -> Count(0-60)
  */
  const chartSize = { x: 150, y: 150 };
  const chartMargins = {
    top: 5,
    right: 5,
    bottom: 5,
    left: 5,
  };
  const matrixSize = {
    rows: 5,
    columns: 5,
  };

  const sceneSize = {
    width:
      matrixSize.columns *
      (chartMargins.left + chartSize.x + chartMargins.right),
    height:
      matrixSize.rows * (chartMargins.top + chartSize.y + chartMargins.bottom),
  };

  const matrixVariables = [
    "Miles_per_Gallon",
    "Displacement",
    "Horsepower",
    "Weight_in_lbs",
    "Acceleration",
  ];

  const matrixAccessors = {};
  matrixVariables.forEach((variable) => {
    matrixAccessors[variable] = (data) => data[variable];
  });

  // create matrix of charts' wrappers
  const chartsMatrix = [];

  let cellCount = 0;

  for (let i = 1; i <= matrixSize.rows; i = i + 1) {
    for (let j = 1; j <= matrixSize.columns; j = j + 1) {
      const [variableX, variableY] = [
        matrixVariables[i - 1],
        matrixVariables[j - 1],
      ];
      const isDiagonal = variableX === variableY;
      const accessors = isDiagonal
        ? [matrixAccessors[variableX]]
        : [matrixAccessors[variableX], matrixAccessors[variableY]];

      chartsMatrix.push({
        translateX:
          i * chartMargins.left + (i - 1) * (chartSize.x + chartMargins.right),
        translateY:
          j * chartMargins.top + (j - 1) * (chartSize.y + chartMargins.bottom),
        fillColor: chartColors[cellCount],
        accessors,
        key: `${variableX}-${variableY}`,
        edges: {
          top:
            j * chartMargins.top +
            (j - 1) * (chartSize.y + chartMargins.bottom),
          right: i * (chartMargins.left + chartSize.x + chartMargins.right),
          bottom: j * (chartMargins.top + chartSize.y + chartMargins.bottom),
          left:
            i * chartMargins.top +
            (i - 1) * (chartSize.y + chartMargins.bottom),
        },
      });
      cellCount += 1;
    }
  }

  console.log(chartsMatrix);

  return (
    <main id="week-one" className="w-full mt-10">
      <Link to={`/`} className="font-mono italic text-xl mb-4 link-on-hover">
        {" "}
        &larr; Go back to homepage
      </Link>
      <h2 className="font-sans font-extrabold text-2xl">
        Weeks VIII - IX: Matrix of Scatterplots
      </h2>

      <div className="relative" style={{ maxWidth: sceneSize.width }}>
        <p className="font-mono text-l my-4">
          I started by experimenting to create only the matix of correctly
          placed SVG groups. I added them hardcoded colors, so I can track if
          everything is placed in the right cell.
        </p>
        <MatrixDraft />
        <p className="font-mono text-l my-4">
          Next I added accessors creation to the double loop, that creates the
          matrix. Instead of controlling placement of the chart by
          transform/translate, I decided to pass the calulated edges of the cart
          area, and use them to create the range for points on the chart. For
          now I don&apos;t see the benefits of one approach over another, but
          that may change once Il&apos;l start adding interactivities.
        </p>
        <svg
          viewBox={`0 0 ${sceneSize.width} ${sceneSize.height}`}
          width={sceneSize.width}
          height={sceneSize.height}
          className="m-10"
        >
          {chartsMatrix.map((wrapper) => (
            <g key={wrapper.key}>
              <rect
                width={chartSize.x}
                height={chartSize.y}
                rx={5}
                fill="#f0f0f0"
                transform={`translate(${wrapper.translateX}, ${wrapper.translateY})`}
              />
              {wrapper.accessors.length === 1 ? (
                <SimpleHistogram
                  dataset={dataSet}
                  xAccessor={wrapper.accessors[0]}
                  chartTopEdge={wrapper.edges.top}
                  chartRightEdge={wrapper.edges.right}
                  chartBottomEdge={wrapper.edges.bottom}
                  chartLeftEdge={wrapper.edges.left}
                />
              ) : (
                <SimpleScatterplot
                  dataset={dataSet}
                  xAccessor={wrapper.accessors[0]}
                  yAccessor={wrapper.accessors[1]}
                  colorAccessor={(data) => data["Origin"]}
                  chartTopEdge={wrapper.edges.top}
                  chartRightEdge={wrapper.edges.right}
                  chartBottomEdge={wrapper.edges.bottom}
                  chartLeftEdge={wrapper.edges.left}
                />
              )}
            </g>
          ))}
        </svg>
      </div>
    </main>
  );
}

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

export default WeeksEightAndNine;
