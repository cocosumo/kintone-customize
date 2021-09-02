import { getEmployeeNumber } from '../backend/user';

const onCreateHandler = async ({ record }) => {
  const { employeeNumber } = record;
  employeeNumber.value = await getEmployeeNumber();
  console.log(employeeNumber);
  return { record };
};

export default onCreateHandler;
