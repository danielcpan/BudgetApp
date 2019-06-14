module.exports = `
  type Query {
    user(id: ID!): User!
    users: [User!]!
  }

  type Mutation {
    createUser(input: UserInput!): User!
    updateUser(input: UserInput!): User!
    deleteUser(id: ID!): Boolean!
  }

  type User {
    id: ID!
    email: String!
    status: String!
    firstName: String!
    lastName: String!
    userRole: String!
    totalExpenses: String!
    expenses: [Expense!]!
  }

  input UserInput {
    id: ID
    firstName: String
    lastName: String
    email: String
    userRole: String
  }
`;
