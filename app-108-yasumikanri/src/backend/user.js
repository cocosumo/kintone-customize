import { fetchEmployeeById } from '../../../kintone-api/fetchRecords';

export const getUserInfo = () => kintone.getLoginUser();

export const getEmployeeNumber = () => getUserInfo().employeeNumber;

export const getEmployeeRole = async () => (
  await fetchEmployeeById(getEmployeeNumber())
).record.役職.value;
