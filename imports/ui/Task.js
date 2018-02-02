import React from 'react';
import { Checkbox, ListItem, ListItemText } from 'material-ui';
import { DeleteForever } from 'material-ui-icons';
import { indigo } from 'material-ui/colors/index';

export default ({ item, onFlip, onItemClick, onRemove }) => (
  <ListItem>
    <Checkbox checked={item.done === true} onChange={() => onFlip(item)} />
    <ListItemText
      primary={item.description}
      secondary={item.details}
      onClick={() => onItemClick(item)}
    />
    <DeleteForever
      style={{ color: indigo[700] }}
      onClick={() => onRemove(item)}
    />
  </ListItem>
);
