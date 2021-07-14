import ReactDOM from 'react-dom';
import fetchCars from '../backend/fetchCars';
import { getSpaceElement } from '../../../kintone-api/api';
import AvailableCars from '../components/containers/AvailableCars';

const renderAvailableCarsContainer = () => {
  ReactDOM.render(
    <AvailableCars />, getSpaceElement('available-cars'),
  );
};

const onEditOrCreateHandler = (event) => {
  renderAvailableCarsContainer();
  fetchCars();
  return event;
};

export default onEditOrCreateHandler;
