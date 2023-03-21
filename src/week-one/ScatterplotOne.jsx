export default function ScatterplotOne({ data, xScale, yScale, xKey, yKey, colorAccessor, colorScale }) {
  
  return (
    <>
      {data.map((dataEntry, i) => {
        return dataEntry[xKey] && dataEntry[yKey] ? ( // TODO move "flaky data" filtering to a higher level
          <circle
            key={`dataEntry.name ${i}`}
            r="3"
            cx={xScale(dataEntry[xKey])}
            cy={yScale(dataEntry[yKey])}
            opacity={1}
            fill={colorScale(colorAccessor(dataEntry))}
            fillOpacity={1}
          />) : null
      })}
    </>
  )
}