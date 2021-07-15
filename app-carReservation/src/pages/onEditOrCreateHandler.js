import ReactDOM from 'react-dom';
import fetchCars from '../backend/fetchCars';
import { getSpaceElement } from '../../../kintone-api/api';
import AvailableCars from '../components/containers/AvailableCars';

const renderAvailableCarsContainer = ({ 号車 }) => {
  ReactDOM.render(
    <AvailableCars initialCar={号車.value} />, getSpaceElement('available-cars'),
  );
};

const onEditOrCreateHandler = (event) => {
  const { record } = event;
  renderAvailableCarsContainer(record);
  fetchCars();
  return event;
};

export default onEditOrCreateHandler;
