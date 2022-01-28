import Drawer from '@mui/material/Drawer';
import MainMenu from './MainMenu';

interface DesktopNavProps {
  drawerWidth: number
}

export default function DesktopNav({drawerWidth}: DesktopNavProps) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: {xs: 'none', sm: 'block'},
        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
      }}
      open
    >
      <MainMenu />
    </Drawer>
  );
}