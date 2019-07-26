module.exports.buildDateRange = (dateRange) => {
  let { startDate, endDate } = dateRange || {};

  startDate = new Date(startDate).toISOString()
  endDate = new Date(endDate).toISOString()

  console.log("insdie build date range 111")
  console.log("startDate: " + startDate)
  console.log("endDate: " + endDate)

  if (!dateRange) {
    console.log("overriding")
    const date = new Date();
    startDate = new Date(date.getFullYear(), date.getMonth(), 1).toISOString();
    endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString();
  }

  return { startDate, endDate };
};
