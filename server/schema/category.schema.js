module.exports = `
  type Query {
    category(id: ID!): Category!
    categories(startDate: String, endDate: String): [Category!]!
    categoriesAll: [Category!]!
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
    isDefault: Boolean!
    totalExpenses(startDate: String, endDate: String): String!
    expenses(startDate: String, endDate: String): [Expense!]!
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
