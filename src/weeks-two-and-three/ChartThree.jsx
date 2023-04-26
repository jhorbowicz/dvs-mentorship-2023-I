import ScatterplotThree from "./ScatterplotThree";
import BaseChart from "../components/BaseChart";
import { useChartLayout } from "../hooks/useChartLayout";

export default function ChartThree({ dataset }) {
  const chartDimensions = useChartLayout();

  return (
    <BaseChart
      dataset={dataset}
      xAccessorKey="Horsepower"
      yAccessorKey="Miles_per_Gallon"
      colorAccessorKey="Origin"
      Chart={ScatterplotThree}
      chartDimensions={chartDimensions}
    />
  );
}
