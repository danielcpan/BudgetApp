import Vue from 'vue';
import VueApollo from 'vue-apollo';
import ApolloClient from 'apollo-boost';

Vue.use(VueApollo);

const apolloClient = new ApolloClient({
  // You should use an absolute URL here
  uri: 'http://localhost:4000/graphql',
});

export default new VueApollo({
  defaultClient: apolloClient,
});
