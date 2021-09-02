import { fetchSettings } from '../../../kintone-api/fetchRecords';
import { ISOtoLuxon } from '../helpers/time';

const getYasumiCount = async (date) => {
  const luxonDate = ISOtoLuxon(date);
  const { 設定: { value: settings } } = (await fetchSettings()).records[0];
  console.log(settings, luxonDate);
};

export default getYasumiCount;
