
import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import {useMediaQuery} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import PersistentDesktopDrawer from './PersistentDesktopDrawer';
import PersistentAppBar from './PersistentAppBar';
import UnderConstruction from '../../ui/contents/UnderConstruction';
const drawerWidth = 240;

const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})<{
  open?: boolean;
}>(({theme, open}) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: useMediaQuery(theme.breakpoints.down('sm')) ? 0 : `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled('div')(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentNav() {
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline />
      <PersistentAppBar {...{handleDrawerOpen}} />
      <PersistentDesktopDrawer {...{handleDrawerClose, open, drawerWidth}} />
      <Main open={open}>
        <DrawerHeader />
        <UnderConstruction />
      </Main>
    </Box>
  );
}
