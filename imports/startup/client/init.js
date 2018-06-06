import { initAccounts } from 'meteor/nicolaslopezj:apollo-accounts';

// Init accounts
initAccounts({
  loginWithFacebook: false,
  loginWithGoogle: false,
  loginWithLinkedIn: false,
  loginWithPassword: true,
});
