import { getEmployeeNumber } from '../backend/user';

const initialize = async (record) => {
  const { employeeNumber } = record;
  employeeNumber.value = await getEmployeeNumber();
  employeeNumber.lookup = true;
};

const onCreateHandler = async (event) => {
  const { record } = event;
  initialize(record);

  return event;
};

export default onCreateHandler;
