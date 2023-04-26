import { LegendOrdinal } from "@visx/legend";
import ScatterplotThree from "./ScatterplotThree";
import BaseChart from "../components/BaseChart";
import { useChartLayout } from "../hooks/useChartLayout";
import { useLegendColorScale } from "../hooks/useLegendColorScale";

export default function ChartThree({ dataset }) {
  const chartDimensions = useChartLayout();
  const { wrapperHeight, wrapperWidth } = chartDimensions;
  const colorScale = useLegendColorScale(dataset, (d) => d["Origin"]);

  return (
    <div className="relative" style={{ maxWidth: wrapperWidth }}>
      <svg
        viewBox={`0 0 ${wrapperWidth} ${wrapperHeight}`}
        width={wrapperWidth}
        height={wrapperHeight}
        className="m-10"
      >
        <BaseChart
          dataset={dataset}
          xAccessorKey="Horsepower"
          yAccessorKey="Miles_per_Gallon"
          colorAccessorKey="Origin"
          Chart={ScatterplotThree}
          chartDimensions={chartDimensions}
        />
      </svg>
      <LegendOrdinal scale={colorScale} className="absolute top-10 right-4" />
    </div>
  );
}
