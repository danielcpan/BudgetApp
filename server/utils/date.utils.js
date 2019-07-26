module.exports.buildDateRange = (dateRange) => {
  let { startDate, endDate } = dateRange || {};

  console.log("nbefore")
  console.log("startDate: " + startDate) 
  console.log("endDate: " + endDate)  

  startDate = new Date(startDate).toISOString()
  endDate = new Date(endDate).toISOString()

  console.log("buidling!")
  console.log("startDate: " + startDate) 
  console.log("endDate: " + endDate)

  if (!dateRange) {
    const date = new Date();
    startDate = new Date(date.getFullYear(), date.getMonth(), 1).toISOString();
    endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString();
  }

  return { startDate, endDate };
};
