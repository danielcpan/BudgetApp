import gql from 'graphql-tag';
import CategoryFragment from './CategoryFragment';

export default gql`
  mutation createCategory($input: CategoryInput!) {
    createCategory(input: $input) {
      ...Category
    }
  }
  ${CategoryFragment}
`;
