import gql from 'graphql-tag';

export default gql`
  fragment Expense on Expense {
    id
    note
    cost
    date
    category {
      id
      name
      icon
      color
    }
  }
`;
