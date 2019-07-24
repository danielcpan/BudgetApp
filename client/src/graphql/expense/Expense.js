import gql from 'graphql-tag';

export default gql`
  query getExpense($id: ID!) {
    expense(id: $id) {
      id
      note
      cost
      date
      categoryId
    }
  }
`;
