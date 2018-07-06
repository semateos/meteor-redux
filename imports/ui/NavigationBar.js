import React from 'react';
import { withStyles } from 'material-ui/styles';
import BottomNavigation, {
  BottomNavigationAction,
} from 'material-ui/BottomNavigation';
import { Add, ViewList, Person } from 'material-ui-icons';
import { Paper } from 'material-ui';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const styles = {
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
};

class NavigationBarComponent extends React.Component {

  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  render() {
    const { classes, location } = this.props;

    let value = 0;

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
      default:
        value = 0;
        break;
    }

    return (
      <Paper elevation={10}>
        <BottomNavigation
          value={value}
          showLabels
          className={classes.root}
        >
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
