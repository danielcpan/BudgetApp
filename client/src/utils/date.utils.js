export function buildDateRange(dateRange) {
  let startDate, endDate

  if (!dateRange) {
    const date = new Date();
    startDate = new Date(date.getFullYear(), date.getMonth(), 1).toISOString();
    endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString();
  } else {
    startDate = dateRange.startDate
    endDate = dateRange.endDate
  }

  return { startDate: startDate, endDate: endDate }
}
