import Overlay from './containers/Overlay';
import MenuDrawer from './nav/MenuDrawer';
import NavBar from './nav/NavBar';

export default function App() {
  return (
    <Overlay>
      <NavBar />
      <MenuDrawer />
    </Overlay>
  );
}