import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { DDPLink } from 'meteor/swydo:ddp-apollo';
import { ConnectedRouter } from 'react-router-redux'
import { withRouter } from 'react-router-dom'
import { App } from '/imports/ui/App';
import { Store, history } from '/imports/store/store';

const theme = createMuiTheme();

const client = new ApolloClient({
  link: new DDPLink(),
  cache: new InMemoryCache(),
});

Meteor.startup(() => {
  render(
    <ApolloProvider client={client}>
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
