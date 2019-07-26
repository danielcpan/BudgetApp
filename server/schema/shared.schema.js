module.exports = `
  type Error {
    path: String!
    message: String
  }

  input DateRangeInput {
    startDate: Date!
    endDate: Date!
  }
`;
