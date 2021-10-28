import fetchEmployees, {getEmployeeCountPerStore} from './fetchEmployees';
import {groupTakkenshiPerStore} from './fetchQualifications';

export const stores = [
  '中川八熊店',
  '千種大久手店',
  '大垣店',
  '蒲郡店',
  '豊川中央店',
  '豊川八幡店',
  '豊橋向山店',
  '豊橋藤沢店',
  '豊田中央店',
  '豊田大林店',
  '高浜中央店',
];

export const data = async () => {

  const employees = await fetchEmployees();

  return {
    employeeCountPerStore: await getEmployeeCountPerStore(employees),
    groupTakkenshiPerStore: await groupTakkenshiPerStore(employees)
  };
};