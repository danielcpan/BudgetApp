import gql from 'graphql-tag';

export default gql`
  fragment Category on Category {
    id
    name
    icon
    color
    isDefault
    totalExpenses(dateRange: $dateRange)
    expenses(dateRange: $dateRange) {
      note
      cost
      date
    }
    userId
  }
`;
