import gql from 'graphql-tag';
import ExpenseFragment from './ExpenseFragment';

export default gql`
  mutation createExpense($input: ExpenseInput!) {
    createExpense(input: $input) {
      ...Expense
    }
  }
  ${ExpenseFragment}
`;
