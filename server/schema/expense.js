export default `
  type Query {
    Expense: Expense!
    Expenses: [Expense!]!
  }


  type Expense {
    id: ID!
    value: Int!,
    note: String
  }

  input ExpenseInput {
    value: Int!,
    note: String,
  }
`;