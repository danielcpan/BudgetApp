// import Vue from 'vue';
// import VueApollo from 'vue-apollo';
// import ApolloClient from 'apollo-boost';

// Vue.use(VueApollo);

// export const apolloClient = new ApolloClient({
//   // uri: 'https://budget-app-daniel-pan.herokuapp.com/graphql',
//   uri: 'http://localhost:5000/graphql',
// });

// export default new VueApollo({
//   defaultClient: apolloClient,
// });

import Vue from 'vue';
import VueApollo from 'vue-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';

Vue.use(VueApollo);

const httpLink = new HttpLink({ uri: 'http://localhost:5000/graphql' });
// const httpLink = new HttpLink({ uri: 'https://budget-app-daniel-pan.herokuapp.com/graphql' });

const middlewareLink = setContext(() => ({
  headers: {
    'x-token': localStorage.getItem('token'),
    'x-refresh-token': localStorage.getItem('refreshToken'),
  },
}));

// const middlewareLink = setContext(() => {
//   return {
//     headers: {
//       'x-token': localStorage.getItem('token'),
//       'x-refresh-token': localStorage.getItem('refreshToken')
//     }
//   }
// });

// const middlewareLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem('token');
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       'x-token': localStorage.getItem('token'),
//       'x-refresh-token': localStorage.getItem('refreshToken')
//     }
//   }
// });

// const middlewareLink = new ApolloLink((operation, forward) => {
//   // add the authorization to the headers
//   operation.setContext({
//     headers: {
//       'x-token': localStorage.getItem('token'),
//       'x-refresh-token': localStorage.getItem('refreshToken')
//     }
//   });
//   return forward(operation);
// })

// const afterwareLink = new ApolloLink((operation, forward) => {
//   const { headers } = operation.getContext();
//   console.log("headers")
//   console.log(headers)
//   console.log(operation.getContext())

//   if (headers) {
//     const token = headers.get('x-token');
//     const refreshToken = headers.get('x-refresh-token');

//     if (token) { localStorage.setItem('token', token); }
//     if (refreshToken) { localStorage.setItem('refreshToken', refreshToken); }
//   }

//   return forward(operation);
// });


const afterwareLink = new ApolloLink((operation, forward) =>
  forward(operation).map((response) => {
    const { response: { headers } } = operation.getContext();
    console.log(response)
    console.log("headers")
    console.log(headers)
    console.log("test")
    console.log(middlewareLink)
    if (headers) {
      console.log("made it here!")
      const token = headers.get('x-token');
      const refreshToken = headers.get('x-refresh-token');

      console.log("token: " + token);
      console.log("refresh-token: " + refreshToken)

      if (token) { localStorage.setItem('token', token) }
      if (refreshToken) { localStorage.setItem('refreshToken', refreshToken) }
    }

    return response;
  }));

const link = afterwareLink.concat(middlewareLink.concat(httpLink));

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default new VueApollo({
  defaultClient: apolloClient,
});
