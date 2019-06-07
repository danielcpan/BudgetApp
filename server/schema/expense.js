module.exports = `
  type Query {
    expense(id: ID!): Expense!
    expenses(userId: ID): [Expense!]!
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
    category: Category!
  }

  input ExpenseInput {
    value: String
    note: String
    userId: Int
    categoryId: Int
  }
`;
