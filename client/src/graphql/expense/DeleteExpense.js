import gql from 'graphql-tag';

export default gql`
  mutation deleteExpense($id: ID!) {
    deleteExpense(id: $id)
  }
`;
