import Overlay from './ui/containers/Overlay';
// import ResponsiveNav from '../nav/ResponsiveNav';
import ShortCuts from './ui/fabs/ShortCuts';
import MainScreen from './MainScreen';
import {HashRouter} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';


export default function App() {
  return (
    <HashRouter>
      <CssBaseline />
      <Overlay>
        {/* <ResponsiveNav /> */}
        <MainScreen />
        <ShortCuts />
      </Overlay>
    </HashRouter>
  );
}