import Divider from '@mui/material/Divider';

import List from '@mui/material/List';

import KintoneButton from '../ui/buttons/KintoneButton';
import CustomerMenu from './menus/CustomerMenu';
import ContractMenu from './menus/ContractMenu';
import SystemMenu from './menus/SystemMenu';

export default function CocoMenu() {
  return (
    <div>

      <Divider />
      <List>
        <CustomerMenu />
        {/* <CustomerManagementMenu /> */}
        <ContractMenu />
      </List>
      <Divider />
      <SystemMenu />
      <Divider />
      <KintoneButton />
    </div>
  );
}