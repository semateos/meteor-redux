import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Paper from '@material-ui/core/Paper';
import { Add, ViewList, Person } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const styles = {
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
};

class NavigationBarComponent extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  };

  render() {
    const { classes, location } = this.props;

    let value;

    switch (location.pathname) {
      case '/':
        value = 0;
        break;
      case '/tasks':
        value = 1;
        break;
      case '/add':
        value = 2;
        break;
    }

    return (
      <Paper elevation={10}>
        <BottomNavigation value={value} showLabels className={classes.root}>
          <BottomNavigationAction
            label="Login"
            icon={<Person />}
            component={Link}
            to="/"
          />
          <BottomNavigationAction
            label="Tasks"
            icon={<ViewList />}
            component={Link}
            to="/tasks"
          />
          <BottomNavigationAction
            label="Add"
            icon={<Add />}
            component={Link}
            to="/add"
          />
        </BottomNavigation>
      </Paper>
    );
  }
}

export const NavigationBar = withStyles(styles)(NavigationBarComponent);
