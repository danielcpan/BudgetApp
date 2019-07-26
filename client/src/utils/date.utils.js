export function buildDefaultDateRange() { // eslint-disable-line import/prefer-default-export
  const date = new Date();
  const startDate = new Date(date.getFullYear(), date.getMonth(), 1).toISOString();
  const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString();

  return { startDate, endDate };
}
