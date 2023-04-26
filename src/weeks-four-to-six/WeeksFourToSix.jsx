import { Link } from "react-router-dom";
import ChartFive from "./ChartFive";
import { useData } from "../hooks/useData";

function WeeksFourToSix() {
  const chartData = useData(
    "https://raw.githubusercontent.com/vega/vega-datasets/next/data/cars.json"
  );

  return (
    <main id="week-one" className="w-full mt-10">
      <Link to={`/`} className="font-mono italic text-xl mb-4 link-on-hover">
        {" "}
        &larr; Go back to homepage
      </Link>
      <h2 className="font-sans font-extrabold text-2xl">
        Weeks IV - VI: Reusability and Marginal Histogram
      </h2>
      <p>
        TO-DO: describe the refactors, which abstractions were helpful, which
        ones were rather useless
      </p>
      {chartData.length ? <ChartFive dataset={chartData} /> : null}
    </main>
  );
}

export default WeeksFourToSix;
