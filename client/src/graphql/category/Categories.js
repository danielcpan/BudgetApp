import gql from 'graphql-tag';
import CategoryFragment from './CategoryFragment';

export default gql`
  query getCategories {
    categories {
      ...Category
    }
  }
  ${CategoryFragment}
`;
