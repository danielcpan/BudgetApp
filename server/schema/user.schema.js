module.exports = `
  type Query {
    currentUser: User
    user(id: ID!): User!
    users: [User!]!
    isEmailUnique(email: String!): Boolean!
  }

  type LoginResponse {
    ok: Boolean!
    token: String
    refreshToken: String
    errors: [Error!]
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): LoginResponse!
    logout: Boolean!
    createUser(input: UserInput!): User
    updateUser(input: UserInput!): User
    deleteUser(id: ID!): Boolean
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
