import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import List from '@mui/material/List';
import {ListItemButton} from '@mui/material';


export default function SystemMenu() {

  return (
    <List>
      <ListItemButton component="a" href={`https://rdmuhwtt6gx7.cybozu.com/k/admin/app/flow?app=${kintone.app.getId()}#section=settings`}>

        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="設定" />
      </ListItemButton>
      <ListItem button>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="ログアウト" />
      </ListItem>

    </List>
  );
}
