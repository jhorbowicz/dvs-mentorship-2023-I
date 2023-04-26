export const defaultXScaleHeight = 30;
export const defaultYScaleWidth = 50;
export const defaultRightMargin = 10;
export const defaultTopMargin = 0;

// All values here are relative to chart itself, therefor I called
// the spacings - "margin" and svg size - "wrapper" size
export const useChartLayout = (
  wrapperWidth = 800,
  wrapperHeight = 450,
  topMargin = defaultTopMargin,
  rightMargin = defaultRightMargin,
  bottomMargin = defaultXScaleHeight,
  leftMargin = defaultYScaleWidth
) => ({
  wrapperHeight,
  wrapperWidth,
  topMargin,
  rightMargin,
  bottomMargin,
  leftMargin,
  chartHeight: wrapperHeight - topMargin - bottomMargin,
  chartWidth: wrapperWidth - leftMargin - rightMargin,
});
