import ReactDOM from 'react-dom';
import fetchCars from '../backend/fetchCars';
import {getSpaceElement} from '../../../kintone-api/api';
import AvailableCarsV2 from '../components/containers/AvailableCarsV2';

const renderAvailableCarsContainer = async (record) => {
  const allCars = await fetchCars();
  ReactDOM.render(
    <AvailableCarsV2
      initialRecord={record}
      allCars={allCars.records}
    />, getSpaceElement('available-cars'),
  );
};

const onEditOrCreateHandler = (event) => {
  const {record} = event;
  renderAvailableCarsContainer(record);
  console.log(event.type);

  return event;
};

export default onEditOrCreateHandler;
