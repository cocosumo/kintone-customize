import Divider from '@mui/material/Divider';

import List from '@mui/material/List';

import KintoneButton from '../ui/buttons/KintoneButton';
import CustomerMenu from './menus/CustomerMenu';
import CustomerManagementMenu from './menus/CustomerManagementMenu';
import ContractMenu from './menus/ContractMenu';
import SystemMenu from './menus/SystemMenu';

export default function CocoMenuDrawer() {
  return (
    <div>
      <KintoneButton />
      <Divider />
      <List>
        <CustomerMenu />
        <CustomerManagementMenu />
        <ContractMenu />
      </List>
      <Divider />
      <SystemMenu />
    </div>
  );
}