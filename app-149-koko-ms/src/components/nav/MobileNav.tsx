import Drawer from '@mui/material/Drawer';
import MainMenu from './MainMenu';

interface MobilNavProps {
  mobileOpen: boolean,
  handleDrawerToggle: ()=>void,
  drawerWidth: number
}

export default function MobileNav({mobileOpen, handleDrawerToggle, drawerWidth}: MobilNavProps) {
  return (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: {xs: 'block', sm: 'none'},
        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
      }}
    >
      <MainMenu />
    </Drawer>
  );
}