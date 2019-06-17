import gql from 'graphql-tag';
import UserFragment from './UserFragment';

export default gql`
  query getUser($id: ID!) {
    user(id: $id) {
      ...User
    }
  }
  ${UserFragment}
`;
