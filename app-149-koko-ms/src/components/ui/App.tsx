import Overlay from './containers/Overlay';
import ResponsiveNav from '../nav/ResponsiveNav';
import ShortCuts from '../fabs/ShortCuts';

export default function App() {
  return (
    <Overlay>
      <ResponsiveNav />
      <ShortCuts />
    </Overlay>
  );
}