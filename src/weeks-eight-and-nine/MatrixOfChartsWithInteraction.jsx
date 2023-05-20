import { Grid } from "@visx/grid";
import { AxisLeft, AxisBottom } from "@visx/axis";

import { scaleLinear, extent, max } from "d3";

import SimpleHistogram from "./SimpleHistogram";
import SimpleScatterplot from "./SimpleScatterplot";

function MatrixOfChartsWithInteractions({ dataSet }) {
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

  const scenePadding = {
    top: 0,
    right: 0,
    bottom: 50,
    left: 50,
  };

  const sceneSize = {
    width:
      scenePadding.left +
      matrixSize.columns *
        (chartMargins.left + chartSize.x + chartMargins.right) +
      scenePadding.right,
    height:
      scenePadding.top +
      matrixSize.rows * (chartMargins.top + chartSize.y + chartMargins.bottom) +
      scenePadding.bottom,
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

      const xScale = scaleLinear()
        .domain(extent(dataSet, matrixAccessors[variableX]))
        .nice()
        .range([5, chartSize.x - 5]);

      let yScale = scaleLinear()
        .domain([0, max(dataSet, matrixAccessors[variableY]) + 5])
        .range([chartSize.y - 5, 5]);

      chartsMatrix.push({
        translateX:
          i * chartMargins.left +
          (i - 1) * (chartSize.x + chartMargins.right) +
          scenePadding.left,
        translateY:
          j * chartMargins.top +
          (j - 1) * (chartSize.y + chartMargins.bottom) +
          scenePadding.top,
        accessors,
        xScale,
        yScale,
        key: `${variableX}-${variableY}`,
        edges: {
          top:
            j * chartMargins.top +
            (j - 1) * (chartSize.y + chartMargins.bottom),
          right:
            scenePadding.left +
            i * (chartMargins.left + chartSize.x + chartMargins.right),
          bottom: j * (chartMargins.top + chartSize.y + chartMargins.bottom),
          left:
            i * chartMargins.top +
            (i - 1) * (chartSize.y + chartMargins.bottom) +
            scenePadding.left,
        },
      });
    }
  }

  return (
    <div className="relative" style={{ maxWidth: sceneSize.width }}>
      <svg
        viewBox={`0 0 ${sceneSize.width} ${sceneSize.height}`}
        width={sceneSize.width}
        height={sceneSize.height}
        className="m-10"
      >
        {matrixVariables.map((variable, index) => {
          const { translateX, translateY, yScale } = chartsMatrix[index];
          return (
            <g
              key={`axis-left-${variable}`}
              transform={`translate(${translateX}, ${translateY})`}
            >
              <AxisLeft scale={yScale} numTicks={4} />
            </g>
          );
        })}
        {chartsMatrix.map((wrapper) => (
          <g key={wrapper.key}>
            <rect
              width={chartSize.x}
              height={chartSize.y}
              rx={5}
              fill="#247BA015"
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
              <>
                <g
                  transform={`translate(${wrapper.translateX}, ${wrapper.translateY})`}
                >
                  <Grid
                    xScale={wrapper.xScale}
                    yScale={wrapper.yScale}
                    width={chartSize.x - 5}
                    height={chartSize.y - 5}
                    stroke="#01010133"
                    strokeWidth={1}
                    numTicksRows={5}
                    numTicksColumns={4}
                  />
                </g>
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
              </>
            )}
            {matrixVariables.map((variable, index) => {
              const { translateX, translateY, xScale } =
                chartsMatrix[5 * index + 4];
              return (
                <g
                  key={`axis-left-${variable}`}
                  transform={`translate(${translateX}, ${
                    translateY + chartSize.y
                  })`}
                >
                  <AxisBottom scale={xScale} numTicks={5} />
                </g>
              );
            })}
          </g>
        ))}
      </svg>
    </div>
  );
}

export default MatrixOfChartsWithInteractions;
