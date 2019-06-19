import gql from 'graphql-tag';
import UserFragment from './UserFragment';

export default gql`
  mutation updateUser($input: UserInput!) {
    updateUser(input: $input) {
      ...User
    }
  }
  ${UserFragment}
`;
