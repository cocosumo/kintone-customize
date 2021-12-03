import Collapse from '@mui/material/Collapse';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {useState} from 'react';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';


export default function CustomerMenu() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <PermIdentityIcon />
        </ListItemIcon>
        <ListItemText primary="顧客情報" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{pl: 4}}>
            <ListItemIcon>
              <AppRegistrationIcon />
            </ListItemIcon>
            <ListItemText primary="新規登録" />
          </ListItemButton>
          <ListItemButton sx={{pl: 4}}>
            <ListItemIcon>
              <PersonSearchIcon />
            </ListItemIcon>
            <ListItemText primary="顧客検索" />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
}