import { adjustByDays } from '../../helpers/Time';
import { getEmployeeNumber } from '../../backend/user';

export const initializeRecord = async (record) => {
  const { employeeNumber } = record;
  employeeNumber.value = await getEmployeeNumber();
};

const onCreateHandler = async (event) => {
  const { record } = event;
  const { reportDate, plansDate } = record;
  initializeRecord(record);
  plansDate.value = adjustByDays(reportDate.value, 1);
  return event;
};

export default onCreateHandler;
