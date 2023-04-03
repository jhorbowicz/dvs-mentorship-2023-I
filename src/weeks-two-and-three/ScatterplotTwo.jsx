export default function ScatterplotTwo({
  data,
  xScale,
  yScale,
  xAccessor,
  yAccessor,
  colorAccessor,
  colorScale,
  onMouseOverHandler = () => {},
  onMouseOutHandler = () => {},
}) {
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
            onMouseOver={(event) =>
              onMouseOverHandler(event, {
                x: xAccessor(dataEntry),
                y: yAccessor(dataEntry),
                origin: colorAccessor(dataEntry),
              })
            }
            onMouseOut={onMouseOutHandler}
          />
        );
      })}
    </>
  );
}
