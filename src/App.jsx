import { Link } from "react-router-dom";

function App() {
  return (
    <main className="w-full flex mt-10">
      <section id="graph-preview" className="w-2/4">
        <span className="font-mono">
          Here a preview of a graph will be displayed.
        </span>
      </section>
      <section id="table-of-content" className="w-2/4">
        <h3 className="font-mono italic text-xl mb-4">table of content</h3>
        <ul>
          <li>
            <h2 className="font-sans font-extrabold text-2xl link-on-hover">
              <Link to={`week-1`}>week I: simple scatterplot</Link>
            </h2>
            <p className="pt-2 font-mono">
              In the first week of mentorship, I learned about the basics of the
              technologies, that I will be using to create Data Visualizations,
              like D3 or visX, as well as common terminology and basic concepts
              of Data Visualizations in general.
            </p>
          </li>
          <li>
            <h2 className="font-sans font-extrabold text-2xl link-on-hover">
              <Link to={`weeks-2-and-3`}>
                weeks II & III: basic chart interactions
              </Link>
            </h2>
            <p className="pt-2 font-mono">
              During weeks II and III I learned basics concepts and techiques,
              that may be useful while adding interactivity layer to the charts.
            </p>
          </li>
        </ul>
      </section>
    </main>
  );
}

export default App;
