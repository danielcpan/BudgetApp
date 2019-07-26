import gql from 'graphql-tag';
import ExpenseFragment from './ExpenseFragment';

export default gql`
  query getExpenses($dateRange: DateRangeInput) {
    expenses(dateRange: $dateRange) {
      ...Expense
    }
  }
  ${ExpenseFragment}
`;
