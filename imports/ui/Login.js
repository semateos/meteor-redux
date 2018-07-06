import React from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, Tabs, Tab } from 'material-ui';
import Accounts from 'meteor-apollo-accounts-client';

export default class Login extends React.Component {

  static propTypes = {
    signup: PropTypes.func.isRequired
  }

  defaultState = {
    email: '',
    password: '',
    confirmPassword: '',
    selectedTabIndex: 0,
    formErr: null
  };

  state = this.defaultState;

  onInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  }

  onSubmit = () => {
    const { email, password, confirmPassword, selectedTabIndex } = this.state;

    this.setState({
      formErr: null,
    },
    async () => {
      if (selectedTabIndex === 1 &&
          password !== confirmPassword) {
        return this.setState({
          formErr: new Error('Passwords don\'t match'),
        });
      }

      const profile = {
        name: email,
      };

      if (selectedTabIndex === 0) {
        const loginResponse = await Accounts.loginWithPassword({ email, password, profile });
        return loginResponse;
      }

      return Accounts.createUser({ email, password, profile })
      .then((response) => {

        console.log('signup response', response);

        return response;
      })
      .catch((err) => {

        return this.setState({
          formErr: err,
        });
      });
    });
  }

  onTabsChange = (evt, value) => {
    this.setState({
      selectedTabIndex: value,
      formErr: null,
    });
  }

  render() {
    const { formErr, selectedTabIndex } = this.state;

    return (
      <div className="form-container">
        <Tabs value={selectedTabIndex} onChange={this.onTabsChange}>
          <Tab label="Login" />
          <Tab label="Signup" />
        </Tabs>

        <form className="form">
          <TextField
            name="email"
            label="Email"
            value={this.state.email}
            onChange={this.onInputChange}
            fullWidth
            required
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            value={this.state.password}
            onChange={this.onInputChange}
            fullWidth
            required
          />
          {selectedTabIndex === 1 && (
            <TextField
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              value={this.state.confirmPassword}
              onChange={this.onInputChange}
              fullWidth
              required
            />
          )}
          {formErr && (
            <div className="error">{formErr.message}</div>
          )}
          <Button
            className="form-action"
            raised="true"
            color="primary"
            onClick={this.onSubmit}>{selectedTabIndex === 0 ? 'Login' : 'Signup'}</Button>
        </form>
      </div>
    );
  }
}
