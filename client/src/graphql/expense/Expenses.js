import gql from 'graphql-tag';
import ExpenseFragment from './ExpenseFragment';

export default gql`
  query getExpenses($startDate: String, $endDate: String) {
    expenses(startDate: $startDate, endDate: $endDate) {
      ...Expense
    }
  }
  ${ExpenseFragment}
`;
