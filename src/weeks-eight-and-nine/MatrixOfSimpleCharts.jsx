import SimpleHistogram from "./SimpleHistogram";
import SimpleScatterplot from "./SimpleScatterplot";

function MatrixOfSimpleCharts({ dataSet }) {
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
  );
}

export default MatrixOfSimpleCharts;
