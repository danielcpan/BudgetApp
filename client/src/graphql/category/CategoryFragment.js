import gql from 'graphql-tag';

export default gql`
  fragment Category on Category {
    id
    name
    icon
    color
    isDefault
    totalExpenses
    expenses(startDate: $startDate, endDate: $endDate) {
      note
      cost
      date
    }
    userId
  }
`;
