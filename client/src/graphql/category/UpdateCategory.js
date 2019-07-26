import gql from 'graphql-tag';
import CategoryFragment from './CategoryFragment';

export default gql`
  mutation updateCategory($input: CategoryInput!, $startDate: String, $endDate: String) {
    updateCategory(input: $input) {
      ...Category
    }
  }
  ${CategoryFragment}
`;
