import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import NavigationBar from '/imports/containers/NavigationBar';
import Menu from '/imports/containers/Menu';
import { Routes } from './Routes';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  toggleMenu = () => {
    event.preventDefault();
    this.setState({ open: !this.state.open });
  };

  closeMenu = () => {
    event.preventDefault();
    this.setState({ open: false });
  };

  render() {
    return (
      <div className="app">
        <CssBaseline />
        <AppBar>
          <Toolbar>
            <IconButton
              color="secondary"
              aria-label="Menu"
              onClick={this.toggleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" color="inherit">
              Meteor Redux
            </Typography>
          </Toolbar>
        </AppBar>
        <Menu open={this.state.open} onSelectMenu={this.closeMenu} />
        <div className="content" style={{ marginTop: 60 }}>
          <Routes />
        </div>
        <NavigationBar />
      </div>
    );
  }
}
