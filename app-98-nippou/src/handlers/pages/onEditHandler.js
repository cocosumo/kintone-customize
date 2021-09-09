import { initializeRecord } from './onCreateHandler';

const onEditHandler = (event) => {
  const { record } = event;
  const { employeeNumber } = record;
  if (!employeeNumber.value) {
    initializeRecord(record);
  }

  return event;
};

export default onEditHandler;
