import { Link } from "react-router-dom"

function WeekOne() {
  return (
    <main id="week-one" className='w-screen mt-10'>
      <Link to={`/`}  className='font-mono italic text-xl mb-4'> &larr; Go back to homepage</Link>
      <h2 className='font-sans font-extrabold text-2xl'>Week 1: Simple scatterplot</h2>
    </main>
  )
}

export default WeekOne