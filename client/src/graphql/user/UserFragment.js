import gql from 'graphql-tag';

export default gql`
  fragment User on User {
    totalExpenses
  }
`;
