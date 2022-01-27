/* eslint-disable import/named */
// import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CocoLogo from './../../assets/logo-cocosumo-system.png';
import {styled, useTheme} from '@mui/material/styles';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import {Stack, Typography, useMediaQuery} from '@mui/material';
import {Link} from 'react-router-dom';
// import SearchField from '../../ui/textfield/SearchField';
// import HelpIcon from '@mui/icons-material/Help';


interface AppBarProps extends MuiAppBarProps {
  handleDrawerOpen?: ()=>void
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme}) => ({
  zIndex: 5000,
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

}));


export default function PersistentAppBar({handleDrawerOpen}: AppBarProps) {

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <AppBar position="fixed">

      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        m={1}
      >
        <Stack
          direction="row"
          spacing={2}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{mx: 2}}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/"> <img height="40px" src={CocoLogo} alt="" /></Link>

        </Stack>
        {!isSmallScreen &&
        <div>
          {/* <SearchField /> */}
          <Typography>{kintone.getLoginUser().name}</Typography>

        </div> }


      </Stack>

    </AppBar>
  );
}