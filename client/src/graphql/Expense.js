import gql from 'graphql-tag';
import ExpenseFragment from './ExpenseFragment';

export default gql`
  query getExpense($id: ID!) {
    expense(id: $id) {
      ...Expense
    }
  }
  ${ExpenseFragment}
`;
