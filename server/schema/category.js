module.exports = `
  type Query {
    category(id: ID!): Category!
    categories(userId: ID): [Category!]!
  }

  type Mutation {
    createCategory(input: CategoryInput!): Category!
    updateCategory(input: CategoryInput!): Category!
    deleteCategory(id: ID!): Boolean!
  }

  type Category {
    id: ID!
    name: String!
    icon: String!
    color: String!
    totalExpenses: String!
    expenses: [Expense!]!
    userId: ID!
  }

  input CategoryInput {
    id: ID
    name: String
    icon: String
    color: String
    userId: ID
  }
`;
