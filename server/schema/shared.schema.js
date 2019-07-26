module.exports = `
  type Error {
    path: String!
    message: String
  }

  input DateRange {
    startDate: Date!
    endDate: Date!
  }
`;
