export default `
  type Query {
    expense(id: ID!): Expense!
    expenses: [Expense!]!
  }

  type Mutation {
    createExpense(input: ExpenseInput!): Expense!
    updateExpense(id: ID!, input: ExpenseInput!): Expense!
    deleteExpense(id: ID!): Boolean!
  }

  type Expense {
    id: ID!
    value: String!
    note: String
    userId: ID!
    user: User!
  }

  input ExpenseInput {
    value: String
    note: String
    userId: Int
  }
`;
