import { Link } from "react-router-dom";
import { useData } from "../hooks/useData";
import ChartTwo from "./ChartTwo";

function WeeksTwoAndThree() {
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
        Weeks II & III: Basic chart interactions
      </h2>
      {chartData.length ? (
        <ChartTwo dataset={chartData} width={600} height={450} />
      ) : null}
    </main>
  );
}

export default WeeksTwoAndThree;
