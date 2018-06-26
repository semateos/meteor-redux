import { Meteor } from 'meteor/meteor';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { DDPLink } from 'meteor/swydo:ddp-apollo';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { ApolloClient } from 'apollo-client';

// const authMiddleware = new ApolloLink((operation, forward) => {
//   // add the authorization to the headers
//   operation.setContext({
//     headers: {
//       authorization: localStorage.getItem('token') || null,
//     },
//   });
//
//   console.log('forward', forward);
//   return forward(operation);
// });

const ApolloDDPLink = new DDPLink({
  connection: Meteor.connection,
});

const logoutLink = onError(({ networkError }) => {
  if (networkError.statusCode === 401) {
    // TODO implement logout()
    console.warn('LOGOUT');
    // logout();
  }
});

const client = new ApolloClient({
  // link: logoutLink.concat(authMiddleware, ApolloDDPLink),
  link: logoutLink.concat(ApolloDDPLink),
  cache: new InMemoryCache(),
});

export default client;
