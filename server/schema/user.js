module.exports = `
  type Query {
    user(id: ID!): User!
    users: [User!]!
  }

  type Mutation {
    createUser(input: UserInput!): User!
    updateUser(id: ID!, input: UserInput!): User!
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
    firstName: String
    lastName: String
    email: String
    userRole: String
  }
`;
