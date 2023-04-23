export default function ScatterplotThree({
  data,
  xScale,
  yScale,
  xAccessor,
  yAccessor,
  colorAccessor,
  colorScale,
  onMouseOverHandler,
  onMouseOutHanlder,
}) {
  // const [familyToHiglight, setFamilyToHiglight] = useState();
  // const highlightFamily = (family) => setFamilyToHiglight(family);

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
            onMouseOver={() =>
              onMouseOverHandler({
                x: xAccessor(dataEntry),
                y: yAccessor(dataEntry),
              })
            }
            onMouseOut={onMouseOutHanlder}
          />
        );
      })}
    </>
  );
}
