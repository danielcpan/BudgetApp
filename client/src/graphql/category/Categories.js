import gql from 'graphql-tag';
import CategoryFragment from './CategoryFragment';

export default gql`
  query getCategories($startDate: String, $endDate: String) {
    categories(startDate: $startDate, endDate: $endDate) {
      ...Category
    }
  }
  ${CategoryFragment}
`;
