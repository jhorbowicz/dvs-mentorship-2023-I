import { Link } from "react-router-dom";
import MatrixDraft from "./MatrixDraft";
import { useData } from "../hooks/useData";
import MatrixOfSimpleCharts from "./MatrixOfSimpleCharts";
import MatrixOfChartsWithInteractions from "./MatrixOfChartsWithInteraction";

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

  return (
    <main id="week-one" className="w-full mt-10">
      <Link to={`/`} className="font-mono italic text-xl mb-4 link-on-hover">
        {" "}
        &larr; Go back to homepage
      </Link>
      <h2 className="font-sans font-extrabold text-2xl">
        Weeks VIII - IX: Matrix of Scatterplots
      </h2>

      <div className="relative" style={{ maxWidth: "1200px" }}>
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
        <MatrixOfSimpleCharts dataSet={dataSet} />
        <p className="font-mono text-l my-4">
          Let&apos;s add some grid, axis and maybe even interactivity!
        </p>
        <MatrixOfChartsWithInteractions dataSet={dataSet} />
      </div>
    </main>
  );
}

export default WeeksEightAndNine;
