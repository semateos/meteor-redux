import { wireMethods } from '/imports/lib/wireMethods';
import BcryptJs from 'bcryptjs';
import { createUser, loginWithPassword } from 'meteor-apollo-accounts'
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
      const hashedPassword = BcryptJs.hash(password, 10);
      const response = await createUser({ username: email, email, password: hashedPassword, profile });
      console.log('response', response);
      return true;
    },
  },
];

export default wireMethods(methods);
