import gql from 'graphql-tag';
import CategoryFragment from './CategoryFragment';

export default gql`
  query getCategories($dateRange: DateRangeInput) {
    categories(dateRange: $dateRange) {
      ...Category
    }
  }
  ${CategoryFragment}
`;
