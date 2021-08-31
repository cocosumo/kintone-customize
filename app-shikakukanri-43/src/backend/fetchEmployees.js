import { fetchUpTo500Records } from '../../../kintone-api/fetchRecords';

const fetchEmployees = () => fetchUpTo500Records({ appId: 34 });

export const getEmployeeCountPerStore = async () => {
  const employees = (await fetchEmployees()).records;
  return employees.reduce((prev, { ルックアップ＿店舗名: { value: store } }) => {
    const newObj = { ...prev };
    newObj[store] = (newObj[store] || 0) + 1;
    return newObj;
  }, {});
};

export default fetchEmployees;
