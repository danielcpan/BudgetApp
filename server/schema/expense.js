export default `
  type Query {
    expense: Expense!
    expenses: [Expense!]!
  }

  type Mutation {
    createExpense(input: ExpenseInput!): Expense!
    updateExpense(id: ID!, input: ExpenseInput): Expense!
    deleteExpense(id: ID!): Boolean!
  }

  type Expense {
    id: ID!
    value: Int!
    note: String
  }

  input ExpenseInput {
    value: Int!
    note: String
  }
`