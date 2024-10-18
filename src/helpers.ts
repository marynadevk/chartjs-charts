export const calculatePercentageChange = (
  oldPrice: number,
  newPrice: number
): number => {
  return ((newPrice - oldPrice) / oldPrice) * 100;
};
