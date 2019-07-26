module.exports.buildDateRange = (dateRange) => {
  let { startDate, endDate } = dateRange || {};

  if (!dateRange) {
    const date = new Date();
    startDate = new Date(date.getFullYear(), date.getMonth(), 1).toISOString();
    endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString();
  }

  return { startDate, endDate };
};
