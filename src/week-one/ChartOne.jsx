import { useMemo } from "react";
import { scaleLinear, extent, max, schemeCategory10, scaleOrdinal } from "d3"
import { AxisLeft, AxisBottom } from "@visx/axis"
import { Grid } from "@visx/grid"
import { LegendOrdinal } from "@visx/legend"

import ScatterplotOne from "./ScatterplotOne";

export default function ChartOne({dataset, width, height}) {
  const xAccessor = (d) => d["Horsepower"]
  const yAccessor = (d) => d["Miles_per_Gallon"]
  const originAccessor = (d) => d["Origin"]

   const yScale = useMemo(() => {
    return scaleLinear()
      .domain([0, max(dataset, yAccessor) + 5])
      .range([height, 0])
  })

  const xScale = useMemo(() => {
    return scaleLinear()
      .domain(extent(dataset, xAccessor))
      .range([0, width])
  })

  const colorScale = useMemo(() => {
    const uniqueOrigins = [...new Set(dataset.map(originAccessor))]
    return scaleOrdinal().domain(uniqueOrigins).range(schemeCategory10)
  })

  const hasBothXandY = (d) => xAccessor(d) && yAccessor(d)

  return (
    <div className="relative" style={{maxWidth: width}}>
      <svg viewBox={`0 0 ${width + 100} ${height}`} width={width} height={height} className="m-10">
        <g transform="translate(50, 0)">
          <AxisLeft scale={yScale} />
        </g>
        <g transform="translate(50, 0)">
          <Grid xScale={xScale} yScale={yScale} width={width - 50} height={height} />
        </g>
        <g transform="translate(50, 0)">
          <ScatterplotOne data={dataset.filter(hasBothXandY)} xScale={xScale} yScale={yScale} xAccessor={xAccessor} yAccessor={yAccessor} colorAccessor={originAccessor} colorScale={colorScale} />
        </g>
        <g transform={`translate(50, ${height})`}>
          <AxisBottom scale={xScale} />
        </g>
      </svg>
      <LegendOrdinal scale={colorScale} className="absolute top-10 right-4"/>
    </div>
  )
}
