export default function ScatterplotOne({ data, xScale, yScale, xAccessor, yAccessor, colorAccessor, colorScale }) {

  return (
    <>
      {data.map((dataEntry, i) => {
        return (
          <circle
            key={`dataEntry.name ${i}`}
            r="3"
            cx={xScale(xAccessor(dataEntry))}
            cy={yScale(yAccessor(dataEntry))}
            opacity={1}
            fill={colorScale(colorAccessor(dataEntry))}
            fillOpacity={1}
          />)
      })}
    </>
  )
}
