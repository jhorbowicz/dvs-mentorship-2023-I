import { Link } from "react-router-dom"
import ChartOne from "./ChartOne"
import { useData } from "../hooks/useData"

function WeekOne() {
  const chartData = useData("https://raw.githubusercontent.com/vega/vega-datasets/next/data/cars.json")

  return (
    <main id="week-one" className='w-full mt-10'>
      <Link to={`/`}  className='font-mono italic text-xl mb-4 link-on-hover'> &larr; Go back to homepage</Link>
      <h2 className='font-sans font-extrabold text-2xl'>Week 1: Simple scatterplot</h2>

      {chartData.length && <ChartOne dataset={chartData} width={600} height={450} />}
    </main>
  )
}

export default WeekOne
