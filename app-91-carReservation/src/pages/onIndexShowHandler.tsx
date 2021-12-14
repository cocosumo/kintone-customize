import {INDEX_RESERVATION_STATUS} from '../helper/constants';
import ReactDOM from 'react-dom';
import ReservationStatus from '../components/IndexView/ReservationStatus/ReservationStatus';
import CustomTheme from '../themes/CustomTheme';

interface AppProps {
  viewId: number
}

const App = ({viewId}: AppProps) => {

  const Content = () => {
    switch (viewId) {
      case INDEX_RESERVATION_STATUS:
        return <ReservationStatus />;
      default:
        return <>Nothing</>;
    }
  };

  return (
    <CustomTheme>
      <Content />
    </CustomTheme>
  );
};

const renderBody = (viewId: number) => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    ReactDOM.render(<App {...{viewId}} />, rootElement);
  }
};


const onIndexShowHandler = (event: IndexEvent) => {
  renderBody(event.viewId);
};

export default onIndexShowHandler;
