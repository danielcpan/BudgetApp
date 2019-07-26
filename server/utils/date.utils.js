module.exports.buildDateRange = (dateRange) => {
  let { startDate, endDate } = dateRange || {};

  console.log("insdie build date range")
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
