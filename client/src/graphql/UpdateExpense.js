import gql from 'graphql-tag';
import ExpenseFragment from './ExpenseFragment';

export default gql`
  mutation updateExpense($input: ExpenseInput!) {
    updateExpense(input: $input) {
      ...Expense
    }
  }
  ${ExpenseFragment}
`;
