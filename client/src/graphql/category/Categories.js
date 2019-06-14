import gql from 'graphql-tag';
import CategoryFragment from './CategoryFragment';

export default gql`
  query getCategories($userId: ID!){
    categories(userId: $userId) {
      ...Category
    }
  }
  ${CategoryFragment}
`;