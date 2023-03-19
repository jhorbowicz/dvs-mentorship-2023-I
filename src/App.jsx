import { Link } from "react-router-dom";

function App() {
  return (
      <main className='w-screen flex mt-10'>
        <section id='graph-preview' className='w-2/4'>
          <span className='font-mono'>Here a preview of a graph will be displayed.</span>
        </section>
      <section id='table-of-content' className='w-2/4'>
        <h3 className='font-mono italic text-xl mb-4'>table of content</h3>
          <ul>
            <li className='font-sans font-extrabold text-2xl'>
              <Link to={`week-1`}>week I: basic scatterplot</Link>
            </li>
          </ul>
        </section>
      </main>
  )
}

export default App
