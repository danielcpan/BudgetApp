import gql from 'graphql-tag';
import ExpenseFragment from './ExpenseFragment';

export default gql`
  query getExpenses {
    expenses {
      ...Expense
    }
  }
  ${ExpenseFragment}
`;
