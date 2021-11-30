import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {useState} from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import UpdateIcon from '@mui/icons-material/Update';
import CurrencyYenIcon from '@mui/icons-material/CurrencyYen';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';


export default function CustomerManagementMenu() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <ManageAccountsIcon />
        </ListItemIcon>
        <ListItemText primary="顧客管理" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{pl: 4}}>
            <ListItemIcon>
              <AccountBalanceIcon />
            </ListItemIcon>
            <ListItemText primary="資金計画作成" />
          </ListItemButton>
          <ListItemButton sx={{pl: 4}}>
            <ListItemIcon>
              <CurrencyYenIcon />
            </ListItemIcon>
            <ListItemText primary="見積作成書" />
          </ListItemButton>
          <ListItemButton sx={{pl: 4}}>
            <ListItemIcon>
              <UpdateIcon />
            </ListItemIcon>
            <ListItemText primary="見込管理" />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
}