import gql from 'graphql-tag';
import CategoryFragment from './CategoryFragment';

export default gql`
  mutation createCategory($input: CategoryInput!, $dateRange: DateRangeInput) {
    createCategory(input: $input) {
      ...Category
    }
  }
  ${CategoryFragment}
`;
