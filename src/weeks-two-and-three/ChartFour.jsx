import ScatterplotFour from "./ScatterplotFour";
import BaseChart from "../components/BaseChart";
import { useChartLayout } from "../hooks/useChartLayout";

export default function ChartFour({ dataset }) {
  const chartDimensions = useChartLayout();

  return (
    <BaseChart
      dataset={dataset}
      xAccessorKey="Horsepower"
      yAccessorKey="Miles_per_Gallon"
      colorAccessorKey="Origin"
      Chart={ScatterplotFour}
      chartDimensions={chartDimensions}
    />
  );
}
