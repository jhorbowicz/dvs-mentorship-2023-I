import ScatterplotOne from "./ScatterplotOne";
import BaseChart from "../components/BaseChart";

export default function ChartOne({ dataset, width, height }) {
  const xScaleHeight = 30;
  const yScaleWidth = 50;
  const rightPadding = 10;

  const chartDimensions = {
    wrapperHeight: height,
    wrapperWidth: width,
    xScaleHeight,
    yScaleWidth,
    rightPadding,
    chartHeight: height - xScaleHeight,
    chartWidth: width - yScaleWidth - rightPadding,
  };

  return (
    <BaseChart
      dataset={dataset}
      xAccessorKey="Horsepower"
      yAccessorKey="Miles_per_Gallon"
      colorAccessorKey="Origin"
      Chart={ScatterplotOne}
      chartDimensions={chartDimensions}
      displayLegend={true}
    />
  );
}
