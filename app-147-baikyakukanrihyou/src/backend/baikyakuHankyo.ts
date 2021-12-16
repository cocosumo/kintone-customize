import {fetchRecords} from './../../../kintone-api/typescript/fetchRecordsTS';
import {fetchGroupedAreas} from './shops';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';

const appId : number | null = 147;

// API実行回数節約するために モジュール範囲に格納。
let _area = {};
let _records : KintoneTypes.SavedData[] = [];

const fetchRecordsByDate = async (reportDate : Date) : Promise<KintoneTypes.SavedData[]> => {
  const monthStart = startOfMonth(reportDate).toISOString();
  const monthEnd = endOfMonth(reportDate).toISOString();
  console.log(monthStart, monthEnd);
  return (await fetchRecords({
    appId: appId,
    condition: `反響受付日 >= "${monthStart}" and 反響受付日 <= "${monthEnd}"`
  })).records;
};

export const fetchBaikyakuHankyoGroupByArea = async (reportDate : Date) => {
  const [baikyakuHankyo, areas] = await Promise.all([fetchRecordsByDate(reportDate), fetchGroupedAreas()]);

  const groupedByArea = baikyakuHankyo.reduce<any>((accu, curr) => {
    const {受付店舗: store} = curr;
    const current = accu[areas[store.value]];

    if (current) {
      current.push(curr);
      return {...accu, ...{[areas[store.value]]: current}};
    }
    return {...accu, ...{[areas[store.value]]: [curr]}};
  }, {});

  _area = groupedByArea;
  _records = baikyakuHankyo;

  return groupedByArea;
};

export const getGroupedAreas = () => _area;
export const getHankyoRecords = () => _records;

export default fetchRecordsByDate;