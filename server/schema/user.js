export default `
  type Query {
    user: User!
  }

  type Mutation {
    createUser(input: UserInput!): User!
    updateUser(input: UserInput): User!
  }

  type User {
    id: ID!
    email: String!
    status: String!
    createdAt: String!
    firstName: String!
    lastName: String!
    userRole: String!
  }

  input UserInput {
    firstName: String
    lastName: String
    email: String
    userRole: String!
  }
`;