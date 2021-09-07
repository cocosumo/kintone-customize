import { getEmployeeNumber } from '../backend/user';

const onCreateHandler = async ({ record }) => {
  const { employeeNumber } = record;
  employeeNumber.value = await getEmployeeNumber();
  employeeNumber.lookup = true;

  return { record };
};

export default onCreateHandler;
