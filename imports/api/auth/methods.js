import { wireMethods } from '/imports/lib/wireMethods';
import Accounts from 'meteor-apollo-accounts-client'
// import ApolloClient from '/imports/startup/both/apollo-client';

const methods = [
  {
    name: 'signup',
    returns: Boolean,
    params: {
      email: { type: String },
      password: { type: String },
    },
    run: async ({ email, password }) => {
      const profile = {
        name: email,
      };
      const response = await Accounts.createUser({ username: email, email, password, profile });
      console.log('response', response);
      return true;
    },
  },
];

export default wireMethods(methods);
