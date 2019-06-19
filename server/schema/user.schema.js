module.exports = `
  type Query {
    user(id: ID!): User!
    users: [User!]!
    isEmailUnique(email: String!): Boolean!
  }

  type Mutation {
    createUser(input: UserInput!): User!
    updateUser(input: UserInput!): User!
    deleteUser(id: ID!): Boolean!
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    userRole: String!
    totalExpenses: String!
    expenses: [Expense!]!
  }

  input UserInput {
    id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    userRole: String
  }
`;
