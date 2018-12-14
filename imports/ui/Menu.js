import React from 'react';
import { Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Home, List as ListIcon, AccountCircle } from '@material-ui/icons';

export class Menu extends React.Component {
  render() {
    return (
      <Drawer open={this.props.open} onClose={this.props.onSelectMenu}>
        <List>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <ListItem button onClick={this.props.onSelectMenu}>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          <Link to="/tasks" style={{ textDecoration: 'none' }}>
            <ListItem button onClick={this.props.onSelectMenu}>
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Tasks" />
            </ListItem>
          </Link>
          <ListItem
            button
            onClick={() => {
              this.props.onSelectMenu();
              this.props.logout();
            }}
          >
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
    );
  }
}
