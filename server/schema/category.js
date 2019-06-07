module.exports = `
  type Query {
    category(id: ID!): Category!
    categories: [Category!]!
  }

  type Mutation {
    createCategory(input: CategoryInput!): Category!
    updateCategory(id: ID!, input: CategoryInput!): Category!
    deleteCategory(id: ID!): Boolean!
  }

  type Category {
    id: ID!
    name: String!
    icon: String!
    color: String!
  }

  input CategoryInput {
    name: String
    icon: String
    color: String
  }
`;
