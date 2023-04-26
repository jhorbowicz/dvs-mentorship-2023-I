import { scaleOrdinal, schemeCategory10 } from "d3";

export const useLegendColorScale = (dataset, colorAccessor) =>
  scaleOrdinal()
    .domain([...new Set(dataset.map(colorAccessor))])
    .range(schemeCategory10);
