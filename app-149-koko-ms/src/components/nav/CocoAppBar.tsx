
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import Toolbar from '@mui/material/Toolbar';
import CocoLogo from './../../assets/logo-cocosumo-system.png';

interface CocoAppBarProps extends Props {
  handleDrawerToggle: any,
  drawerWidth: number,

}
/**
 *
 * @param param0
 * @returns
 * @deprecated
 *
 */
const CocoAppBar = ({handleDrawerToggle, drawerWidth}: CocoAppBarProps) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: {sm: `calc(100% - ${drawerWidth}px)`},
        ml: {sm: `${drawerWidth}px`},
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{mr: 2, display: {sm: 'none'}}}
        >
          <MenuIcon />
        </IconButton>
        <img height="40px" src={CocoLogo} alt="" />
      </Toolbar>
    </AppBar>
  );
};

export default CocoAppBar;