import {INDEX_RESERVATION_STATUS} from '../helper/constants';
import ReactDOM from 'react-dom';
import ReservationStatus from '../components/IndexView/ReservationStatus/ReservationStatus';

const getContentBodyByViewId = (viewId : number) => {
  switch (viewId) {
    case INDEX_RESERVATION_STATUS:
      return <ReservationStatus />;
    default:
      return <>Nothing</>;
  }

};

const renderBody = (viewId: number) => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    ReactDOM.render(getContentBodyByViewId(viewId), rootElement);
  }
};


const onIndexShowHandler = (event: IndexEvent) => {
  renderBody(event.viewId);
};

export default onIndexShowHandler;
