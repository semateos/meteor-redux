import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { DDPLink } from 'meteor/swydo:ddp-apollo';
import { App } from '../imports/ui/App';
import Store from '../imports/store/store';

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
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </MuiThemeProvider>
    </ApolloProvider>,
    document.getElementById('app')
  );
});
