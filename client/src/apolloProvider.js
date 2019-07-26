import Vue from 'vue';
import VueApollo from 'vue-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink, from } from 'apollo-link';

Vue.use(VueApollo);

const httpLink = new HttpLink({ uri: process.env.DATABASE_URL || 'http://localhost:5000/graphql' });
// const httpLink = new HttpLink({ uri: 'http://localhost:5000/graphql' });

const authMiddleware = setContext(() => ({
  headers: {
    'x-token': localStorage.getItem('token'),
    'x-refresh-token': localStorage.getItem('refreshToken'),
  },
}));

const authAfterware = new ApolloLink((operation, forward) => forward(operation).map((response) => {
  const { response: { headers } } = operation.getContext();
  if (headers) {
    const token = headers.get('x-token');
    const refreshToken = headers.get('x-refresh-token');

    if (token) { localStorage.setItem('token', token); }
    if (refreshToken) { localStorage.setItem('refreshToken', refreshToken); }
  }

  return response;
}));

const cleanTypeName = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    const omitTypename = (key, value) => (key === '__typename' ? undefined : value);
    operation.variables = JSON.parse(JSON.stringify(operation.variables), omitTypename); // eslint-disable-line no-param-reassign, max-len
  }
  return forward(operation).map(data => data);
});

// Disable Cache temporarily due to caching issues
// For now relying on force refetching
const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

export const apolloClient = new ApolloClient({
  link: from([
    authMiddleware,
    authAfterware,
    cleanTypeName,
    httpLink,
  ]),
  cache: new InMemoryCache(),
  defaultOptions,
});

export default new VueApollo({
  defaultClient: apolloClient,
});
