import renderRoomsTable from '../helper/context';

const onEditShowHandler = (event) => {
  const {record} = event;

  renderRoomsTable(record);
  return event;
};

export default onEditShowHandler;
