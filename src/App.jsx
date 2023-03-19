import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App w-screen h-screen p-4">
      <header>
        <h1 className="text-3xl font-extrabold">
          DVS Mentorship 2023 - cohort 1
        </h1>
        <h2 className='text-xl font-mono'>
          Jan horbowicz
        </h2>
      </header>
      <main className='w-screen flex mt-10'>
        <section id='graph-preview' className='w-2/4'>
          <span className='font-mono'>Here a preview of a graph will be displayed.</span>
        </section>
        <section id='table-of-content' className='w-2/4'>
          <ul>
            <li className='font-sans font-extrabold text-2xl'>
              week I: basic scatterplot
            </li>
          </ul>
        </section>
      </main>
    </div>
  )
}

export default App
