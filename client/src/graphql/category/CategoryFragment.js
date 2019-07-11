import gql from 'graphql-tag';

export default gql`
  fragment Category on Category {
    id
    name
    icon
    color
    isDefault
    totalExpenses
    expenses {
      note
      cost
      date
    }
    userId
  }
`;
