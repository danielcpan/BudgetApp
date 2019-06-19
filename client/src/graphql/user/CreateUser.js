import gql from 'graphql-tag';
import UserFragment from './UserFragment';

export default gql`
  mutation createUser($input: UserInput!) {
    createUser(input: $input) {
      ...User
    }
  }
  ${UserFragment}
`;
