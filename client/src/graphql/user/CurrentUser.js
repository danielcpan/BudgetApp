import gql from 'graphql-tag';
import UserFragment from './UserFragment';

export default gql`
  query getCurrentUser {
    currentUser {
      ...User
    }
  }
  ${UserFragment}
`;
