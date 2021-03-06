import gql from 'graphql-tag';

export default gql`
  mutation login($email: String!, $password: String!){
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;
