import { fetchSettings } from '../../../kintone-api/fetchRecords';
import { getEmployeeRole } from './user';

/* Plus 1 yasumi for support roles. */
const yasumiDaysReference = {
  31: 8,
  30: 7,
  29: 6,
  28: 5,
};

const calcYasumiDays = async (luxonDate) => {
  const monthDays = luxonDate.endOf('month').day;
  return yasumiDaysReference[monthDays];
};

const getYasumiCount = async (luxonDate) => {
  let yasumiDays = 0;
  const { year, month } = luxonDate;
  const employeeRole = await getEmployeeRole();

  const {
    設定: { value: settingsTable },
  } = (await fetchSettings()).records[0];

  const yasumiDaysSetting = settingsTable.find(({ value }) => {
    const { 設定名: { value: settingsName } } = value;
    return settingsName === `休み数_${year}`;
  });

  yasumiDays = !yasumiDaysSetting
    ? 0 : yasumiDays = JSON.parse(yasumiDaysSetting?.value.設定値.value)[month];

  return (yasumiDays || await calcYasumiDays(luxonDate)) + (employeeRole === 'サポート' ? 1 : 0);
};

export default getYasumiCount;
