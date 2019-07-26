import gql from 'graphql-tag';
import CategoryFragment from './CategoryFragment';

export default gql`
  mutation updateCategory($input: CategoryInput!, $dateRange: DateRangeInput) {
    updateCategory(input: $input) {
      ...Category
    }
  }
  ${CategoryFragment}
`;
