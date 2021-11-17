import {fetchRecords} from './../../../kintone-api/typescript/fetchRecordsTS';
import {fetchGroupedAreas} from './shops';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';

const appId : number | null = 147;
let _area = {};

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

    console.log(store.value, 'geel');
    return {...accu, ...{[areas[store.value]]: [curr]}};
  }, {});

  _area = groupedByArea;

  return groupedByArea;
};

export const getAreas = () => _area;

export default fetchRecordsByDate;