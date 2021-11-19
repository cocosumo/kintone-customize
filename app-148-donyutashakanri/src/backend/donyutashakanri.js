

import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import {fetchAllRecords} from './../../../kintone-api/fetchRecords';


const _appId = 148;
let _records;

/**
 * レコードを取得する。
 *
 * @param {Date} reportDate
 * @returns {KintoneTypes.Data[]} レコード配列
 *
 * @todo このモジュールをReactのContextに変える。
 */
const fetchDonyutashaRecordsByDate = (reportDate) => {
  const monthStart = startOfMonth(reportDate).toISOString();
  const monthEnd = endOfMonth(reportDate).toISOString();

  _records = (await fetchAllRecords({
    appId: _appId,
    condition: `反響受付日 >= "${monthStart}" and 反響受付日 <= "${monthEnd}"`
  })).records;

  return _records;
};

/**
 * レコードをを取得
 *
 * @returns レコード配列。
 */
export const getDonyuTashaRecords = () => _records;

export default fetchDonyutashaRecordsByDate;