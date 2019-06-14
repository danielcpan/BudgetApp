import gql from 'graphql-tag';
import ExpenseFragment from './ExpenseFragment';

export default gql`
  query getExpenses($userId: ID!){
    expenses(userId: $userId) {
      ...Expense
    }
  }
  ${ExpenseFragment}
`;
