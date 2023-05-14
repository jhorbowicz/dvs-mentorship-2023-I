import { Link } from "react-router-dom";

function WeeksEightAndNine() {
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
  const chartSize = { x: 250, y: 120 };
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
  const randomColors = [
    "#7bf144",
    "#7ed7d6",
    "#b1f1c4",
    "#f37f79",
    "#393be8",
    "#f5a9b8",
    "#6b286e",
    "#a68e6c",
    "#0b7db8",
    "#6dc0a9",
    "#4a2a3d",
    "#f38c39",
    "#0d19fc",
    "#a1d8b6",
    "#cfe9a5",
    "#0d7c5d",
    "#a49a09",
    "#e4d4ca",
    "#5a4d71",
    "#b46268",
    "#9f5186",
    "#9a88aa",
    "#efb53f",
    "#a0b4b8",
    "#fed3d2",
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
        fillColor: randomColors[cellCount],
      });
      cellCount += 1;
    }
  }

  return (
    <main id="week-one" className="w-full mt-10">
      <Link to={`/`} className="font-mono italic text-xl mb-4 link-on-hover">
        {" "}
        &larr; Go back to homepage
      </Link>
      <h2 className="font-sans font-extrabold text-2xl">
        Weeks VIII - IX: Matrix of Scatterplots
      </h2>
      <p>TO-DO: Describe the matrix of scatterplots.</p>

      <div className="relative" style={{ maxWidth: sceneSize.width }}>
        <svg
          viewBox={`0 0 ${sceneSize.width} ${sceneSize.height}`}
          width={sceneSize.width}
          height={sceneSize.height}
          className="m-10"
        >
          <rect width="100%" height="100%" fill="burgundy" />
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
    </main>
  );
}

export default WeeksEightAndNine;
