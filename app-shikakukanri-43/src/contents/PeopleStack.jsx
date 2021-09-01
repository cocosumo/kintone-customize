import {
  List, ListItem, ListItemText, ListItemIcon,
} from '@material-ui/core';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { kintoneLink } from '../../../kintone-api/api';

const PeopleStack = ({ records }) => {
  const onClickHandler = (id) => {
    window.open(kintoneLink({ recordId: id }));
  };

  const items = records.map((item) => {
    const { $id, 氏名: { value: name } } = item;
    return (
      <ListItem
        key={$id.value}
        onClick={() => onClickHandler($id.value)}
        button
      >
        <ListItemIcon sx={{ minWidth: '', mr: 1 }}>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText sx={{ fontSize: 16 }} primary={name} />

      </ListItem>
    );
  });

  return (
    <List sx={{ pt: 0 }}>
      {items}
    </List>
  );
};

export default PeopleStack;
