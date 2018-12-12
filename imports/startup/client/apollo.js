import { Meteor } from 'meteor/meteor';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { DDPLink } from 'meteor/swydo:ddp-apollo';
import { ApolloClient } from 'apollo-client';

const ApolloDDPLink = new DDPLink({
  connection: Meteor.connection,
});

const client = new ApolloClient({
  link: ApolloDDPLink,
  cache: new InMemoryCache(),
});

export default client;
