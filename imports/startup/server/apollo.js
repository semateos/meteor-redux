import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import { typeDefs } from '/imports/api/apollo/schema';
import { resolvers } from '/imports/api/apollo/resolvers';
import { setup } from 'meteor/swydo:ddp-apollo';
import { initAccounts } from 'meteor/yarn:meteor-apollo-accounts';
import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

const {
  typeDefs: accountsTypeDefs,
  resolvers: accountsResolvers,
} = initAccounts({
  loginWithFacebook: false,
  loginWithGoogle: false,
  loginWithLinkedIn: false,
  loginWithPassword: true,
  CreateUserProfileInput: `
  name: String
`,
});

const mergedTypeDefs = mergeTypes([typeDefs, ...accountsTypeDefs]);
const mergedResolvers = mergeResolvers([resolvers, accountsResolvers]);

const schema = makeExecutableSchema({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
});

setup({
  schema,
});

createApolloServer({
  schema,
});
