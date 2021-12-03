

import {fetchAllRecords} from './../../../kintone-api/fetchRecords';
import {fiscalYearRange} from '../helpers/time';


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
const fetchDonyutashaRecordsByDate = async (reportDate) => {

  const fiscalYear = fiscalYearRange(reportDate);

  _records = (await fetchAllRecords({
    appId: _appId,
    filterCond: `適用年月 >= "${fiscalYear.start.toISOString()}" and 適用年月 <= "${fiscalYear.end.toISOString()}"`
  })).records;

  return _records;
};


/**
 * レコードをを取得
 *
 * @returns {KintoneTypes.Data[]} レコード配列。
 */
export const getDonyuTashaRecords = () => _records;

/**
 * レコードを取得する。
 *
 * @param {Date} reportDate
 * @returns {KintoneTypes.Data[]} レコード配列
 *
 * @todo このモジュールをReactのContextに変える。
 */
export const fetchDonyutashaRecords = async (queryForm) => {

  _records = (await fetchAllRecords({
    appId: _appId,
    filterCond: `適用年月 >= "${queryForm.startDate.toISOString()}" and 適用年月 <= "${queryForm.endDate.toISOString()}"`
  })).records;

  return _records;
};

/**
 * レコードを取得する。
 *
 * @returns {KintoneTypes.Data[]} レコード配列
 *
 * @todo このモジュールをReactのContextに変える。
 */
export const fetchAllDonyutashaRecords = async () => {

  _records = (await fetchAllRecords({
    appId: _appId,
  })).records;

  return _records;
};

export default fetchDonyutashaRecordsByDate;