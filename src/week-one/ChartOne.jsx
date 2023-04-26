import ScatterplotOne from "./ScatterplotOne";
import BaseChart from "../components/BaseChart";
import { useChartLayout } from "../hooks/useChartLayout";

export default function ChartOne({ dataset }) {
  const chartDimensions = useChartLayout();

  return (
    <BaseChart
      dataset={dataset}
      xAccessorKey="Horsepower"
      yAccessorKey="Miles_per_Gallon"
      colorAccessorKey="Origin"
      Chart={ScatterplotOne}
      chartDimensions={chartDimensions}
    />
  );
}
