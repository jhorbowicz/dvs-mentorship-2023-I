function MatrixDraft() {
  const chartSize = { x: 50, y: 50 };
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
  const chartColors = [
    "#0077c8",
    "#009cda",
    "#48a9a6",
    "#68b828",
    "#f7bc05",
    "#f26c21",
    "#ed1c24",
    "#8c4799",
    "#a05c15",
    "#7e7e7e",
    "#5efc8d",
    "#8377d1",
    "#ffc857",
    "#ffb7c3",
    "#00afb9",
    "#55d6be",
    "#437f97",
    "#849324",
    "#ff1654",
    "#eb5e28",
    "#4c78a8",
    "#e45756",
    "#72b7b2",
    "#eeca3b",
    "#b279a2",
    "#9d755d",
    "#bcbd22",
    "#cc79a7",
    "#009e73",
    "#56b4e9",
    "#f58518",
    "#54a24b",
    "#f0e442",
    "#0072b2",
    "#d55e00",
    "#bab0ac",
    "#999999",
    "#ffe8cc",
    "#f2f2f2",
    "#c6e5d9",
    "#fce5cd",
    "#0072b2",
    "#bfd3e6",
    "#ff9da6",
    "#e6f3d0",
  ];

  // create matrix of charts' wrappers
  const chartsWrappersMatrix = [];

  let cellCount = 0;

  for (let i = 1; i <= matrixSize.rows; i = i + 1) {
    for (let j = 1; j <= matrixSize.columns; j = j + 1) {
      chartsWrappersMatrix.push({
        translateX:
          i * chartMargins.left + (i - 1) * (chartSize.x + chartMargins.right),
        translateY:
          j * chartMargins.top + (j - 1) * (chartSize.y + chartMargins.bottom),
        fillColor: chartColors[cellCount],
      });
      cellCount += 1;
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
        <rect width="100%" height="100%" fill="f0f0f0" />
        {chartsWrappersMatrix.map((wrapper) => (
          <g
            key={wrapper.fillColor}
            transform={`translate(${wrapper.translateX}, ${wrapper.translateY})`}
          >
            <rect
              width={chartSize.x}
              height={chartSize.y}
              rx={5}
              fill={wrapper.fillColor}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

export default MatrixDraft;
