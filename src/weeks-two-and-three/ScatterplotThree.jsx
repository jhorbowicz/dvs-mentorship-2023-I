import { useState } from "react";

export default function ScatterplotThree({
  data,
  xScale,
  yScale,
  xAccessor,
  yAccessor,
  colorAccessor,
  colorScale,
}) {
  const [familyToHiglight, setFamilyToHiglight] = useState();
  const highlightFamily = (family) => setFamilyToHiglight(family);

  const disableHighlight = () => setFamilyToHiglight(undefined);

  return (
    <>
      {data.map((dataEntry, i) => {
        return (
          <circle
            key={`dataEntry.name ${i}`}
            r={colorAccessor(dataEntry) === familyToHiglight ? "4" : "3"}
            stroke="red"
            strokeWidth={
              colorAccessor(dataEntry) === familyToHiglight ? "1" : "0"
            }
            cx={xScale(xAccessor(dataEntry))}
            cy={yScale(yAccessor(dataEntry))}
            opacity={1}
            fill={colorScale(colorAccessor(dataEntry))}
            fillOpacity={1}
            onMouseOver={() => highlightFamily(colorAccessor(dataEntry))}
            onMouseOut={disableHighlight}
          />
        );
      })}
    </>
  );
}
