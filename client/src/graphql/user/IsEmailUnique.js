import gql from 'graphql-tag';

export default gql`
  query isEmailUnique($email: String!){
    isEmailUnique(email: $email)
  }
`
