
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import MainMenu from '../MainMenu';
import {styled, useTheme} from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {useMediaQuery} from '@mui/material';

const DrawerHeader = styled('div')(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

interface PersDeskProps {
  drawerWidth: number
  open: boolean
  handleDrawerClose: ()=>void
}


export default function PersistentDesktopDrawer({drawerWidth, handleDrawerClose, open}: PersDeskProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  console.log(isSmallScreen, 'small?');

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant={isSmallScreen ? 'temporary' : 'persistent'}
      anchor="left"
      open={open}
      onClose={handleDrawerClose}
    >
      {!isSmallScreen && <Toolbar />}
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />

      <MainMenu />
    </Drawer>
  );
}