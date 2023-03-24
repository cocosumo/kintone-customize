import {fetchSettings} from '../../../kintone-api/fetchRecords';
import {isNumberTuple} from '../helpers/isNumberTuple';


const prodAppId = '108';

/* Plus 1 yasumi for support roles. */
const yasumiDaysReference = {
  31: 8,
  30: 7,
  29: 6,
  28: 5,
};

const calcYasumiDays = (luxonDate) => {
  const monthDays = luxonDate.endOf('month').day;
  return yasumiDaysReference[monthDays];
};


/**
 *
 * @param {Date} luxonDate
 * @param {} settingsTable
 * @returns
 *
 */
const findSettingInTable = (luxonDate, settingsTable) => {
  const {year} = luxonDate;
  const settings = settingsTable.filter(({value}) => {
    const {設定名: {value: settingsName}} = value;

    return settingsName === `休み数_${year}` || settingsName === '休み数';
  });

  console.log(settings[settings.length - 1]);

  return settings[settings.length - 1];

};

const getYasumiCount = async (luxonDate) => {
  const {month} = luxonDate;
  console.log(luxonDate);

  const employeeRole = localStorage.getItem('employeeRole');

  const {
    設定: {value: settingsTable},
  } = (await fetchSettings(prodAppId)).records[0];

  const yasumiDaysSetting = findSettingInTable(luxonDate, settingsTable);

  const parsedSettings = JSON.parse(yasumiDaysSetting?.value.設定値.value);

  console.log('parsedSettings', parsedSettings);
  const parsedYasumiDays = parsedSettings[month];

  const isSupportRole = employeeRole === 'サポート' || employeeRole === '経理';

  if (typeof parsedYasumiDays === 'number') {
    const yasumiDays = yasumiDaysSetting
      ? JSON.parse(yasumiDaysSetting?.value.設定値.value)[month]
      : 0;

    // Just add 1 yasumi for support roles.
    const finalYasumiDays = (yasumiDays || calcYasumiDays(luxonDate)) + (isSupportRole ? 1 : 0);
    console.log('simpleSettings:finalYasumiDays', employeeRole, finalYasumiDays,);
    return finalYasumiDays;
  }

  if (isNumberTuple(parsedYasumiDays)) {
    const [agentYasumiDays, supportYasumiDays] = parsedYasumiDays;
    const finalYasumiDays = (isSupportRole ? supportYasumiDays : agentYasumiDays) || calcYasumiDays(luxonDate);
    console.log('tupleSettings:finalYasumiDays', employeeRole, finalYasumiDays,);
    return finalYasumiDays;
  }

  console.log('Failed to load settings, using fallback instead.');
  return calcYasumiDays(luxonDate);

};

export default getYasumiCount;
