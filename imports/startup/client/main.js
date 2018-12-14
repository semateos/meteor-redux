import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { ConnectedRouter } from 'react-router-redux';

import Accounts from 'meteor-apollo-accounts-client';
import Initializers from '/imports/initializers/index.js';

import { App } from '/imports/ui/App';
import { Store, history } from '/imports/store/store';
import ApolloClient from './apollo';

Accounts.initWithClient(ApolloClient);

// Allow time for store rehydration, which happens in store/store
setTimeout(() => {
  Initializers.run(Store);
});

const theme = createMuiTheme();

Meteor.startup(() => {
  render(
    <ApolloProvider client={ApolloClient}>
      <MuiThemeProvider theme={theme}>
        <Provider store={Store}>
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </Provider>
      </MuiThemeProvider>
    </ApolloProvider>,
    document.getElementById('app')
  );
});

export default ApolloClient;
