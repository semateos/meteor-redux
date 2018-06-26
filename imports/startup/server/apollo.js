import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import { typeDefs } from '/imports/api/apollo/schema';
import { resolvers } from '/imports/api/apollo/resolvers';
import { setup } from 'meteor/swydo:ddp-apollo';
import { initAccounts } from 'meteor/bigroomstudios:meteor-apollo-accounts';

const schema = makeExecutableSchema({ typeDefs, resolvers });

setup({
  schema,
});

initAccounts({
  loginWithFacebook: false,
  loginWithGoogle: false,
  loginWithLinkedIn: false,
  loginWithPassword: true,
});

createApolloServer({
  schema,
});
