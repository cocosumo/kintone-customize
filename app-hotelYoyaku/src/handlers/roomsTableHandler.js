import renderRoomsTable from '../helper/context';

const roomsTableHandler = (event) => {
  console.log('Rooms Table Changed.');
  const { record } = event;
  renderRoomsTable(record);

  return event;
};

export default roomsTableHandler;
