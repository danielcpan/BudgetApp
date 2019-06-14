import gql from 'graphql-tag';
import CategoryFragment from './CategoryFragment';

export default gql`
  query getCategory($id: ID!){
    category(id: $id) {
      ...Category
    }
  }
  ${CategoryFragment}
`;
