

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import {useState} from 'react';
import CocoAppBar from './CocoAppBar';
import UnderConstruction from './../ui/contents/UnderConstruction';
import Toolbar from '@mui/material/Toolbar';
import MobileNav from './MobileNav';
import DesktopNav from './DesktopNav';


const drawerWidth = 240;


export default function ResponsiveNav() {

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline />
      <CocoAppBar {...{drawerWidth, handleDrawerToggle}} />
      <Box
        component="nav"
        sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
        aria-label="menus"
      >
        <MobileNav {...{mobileOpen, handleDrawerToggle, drawerWidth}} />
        <DesktopNav {...{drawerWidth}} />

      </Box>
      <Box
        component="main"
        sx={{p: 3}}
      >
        <Toolbar />
        <UnderConstruction />
      </Box>
    </Box>
  );
}
