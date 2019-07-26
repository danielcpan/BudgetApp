import gql from 'graphql-tag';

export default gql`
  query getCategory($id: ID!){
    category(id: $id) {
      id
      name
      icon
      color
    }
  }
`;
