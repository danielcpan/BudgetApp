module.exports = `
  type Query {
    category(id: ID!): Category!
    categories(dateRange: DateRangeInput): [Category!]!
    categoriesAll: [Category!]!
  }

  type Mutation {
    createCategory(input: CategoryInput!, dateRange: DateRangeInput): Category!
    updateCategory(input: CategoryInput!, dateRange: DateRangeInput): Category!
    deleteCategory(id: ID!): Boolean!
  }

  type Category {
    id: ID!
    name: String!
    icon: String!
    color: String!
    isDefault: Boolean!
    totalExpenses(dateRange: DateRangeInput): String!
    expenses(dateRange: DateRangeInput): [Expense!]!
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
