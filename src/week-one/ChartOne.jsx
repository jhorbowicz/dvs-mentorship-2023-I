import { useMemo } from "react";
import { scaleLinear, extent, schemeCategory10, scaleOrdinal } from "d3"
import { AxisLeft, AxisBottom } from "@visx/axis"
import { Grid } from "@visx/grid"
import { LegendOrdinal } from "@visx/legend"

import ScatterplotOne from "./ScatterplotOne";

export default function ChartOne({dataset, width, height}) {
  const weightAccessor = (d) => d["Weight_in_lbs"]
  const hpAccessor = (d) => d["Horsepower"]
  const mpgAccessor = (d) => d["Miles_per_Gallon"]
  const originAccessor = (d) => d["Origin"]
  const xMax = width
  const yMax = height

   const yScale = useMemo(() => {
    return scaleLinear()
      .domain(extent(dataset, mpgAccessor))
      .range([yMax, 0])
  })

  const xScale = useMemo(() => {
    return scaleLinear()
      .domain(extent(dataset, hpAccessor))
      .range([0, xMax])
  })

  const colorScale = useMemo(() => {
    const uniqueOrigins = [...new Set(dataset.map(originAccessor))]
    return scaleOrdinal().domain(uniqueOrigins).range(schemeCategory10)
  })
 
  return (
    <svg width={width} height={height + 50} className="m-10">
      <g transform="translate(50, 0)">
        <AxisLeft scale={yScale} />
      </g>
      <g transform="translate(50, 0)">
        <Grid xScale={xScale} yScale={yScale} width={xMax - 50} height={yMax} />
      </g>
      <g transform="translate(50, 0)">
        <ScatterplotOne data={dataset} xScale={xScale} yScale={yScale} xKey="Horsepower" yKey="Miles_per_Gallon" colorAccessor={originAccessor} colorScale={ colorScale} />
      </g>
      <g transform={`translate(50, ${height})`}>
        <AxisBottom scale={xScale} />
      </g>
      <g transform={`translate(600, 0)`}>
        <LegendOrdinal 
          scale={colorScale}
        />
      </g>
    </svg>
  )
}