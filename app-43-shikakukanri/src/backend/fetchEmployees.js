import {fetchAllRecords} from '../../../kintone-api/fetchRecords';
import {stores} from './data';
/**
 *
 * @returns {Promise<object>} KintoneRecords
 */
const fetchEmployees = () => fetchAllRecords({appId: 34, filterCond: '状態 in ("有効")'});

/**
 *
 * @param {Array<object>} [employees] 社員名簿のkintoneRecords
 * @returns {Array<object>} 店舗ごとの社員人数
 */
export const getEmployeeCountPerStore = async (employees) => {

  return (employees || await fetchEmployees())
    .records
    .reduce((prev, {ルックアップ＿店舗名: {value: store}}) => {
      const newObj = {...prev};
      if (stores.includes(store)) {
        newObj[store] = (newObj[store] || 0) + 1;
      }
      return newObj;
    }, {});
};

export default fetchEmployees;
