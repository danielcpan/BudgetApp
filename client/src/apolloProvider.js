import Vue from 'vue';
import VueApollo from 'vue-apollo';
import ApolloClient from 'apollo-boost';

Vue.use(VueApollo);

export const apolloClient = new ApolloClient({
  uri: 'https://budget-app-daniel-pan.herokuapp.com',
  // uri: 'http://localhost:5000/graphql',
});

export default new VueApollo({
  defaultClient: apolloClient,
});
