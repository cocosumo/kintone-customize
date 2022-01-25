import Overlay from './containers/Overlay';
// import ResponsiveNav from '../nav/ResponsiveNav';
import ShortCuts from '../fabs/ShortCuts';
import PersistentNav from '../nav/persistentNav/PersistentNav';

export default function App() {
  return (
    <Overlay>
      {/* <ResponsiveNav /> */}
      <PersistentNav />
      <ShortCuts />
    </Overlay>
  );
}