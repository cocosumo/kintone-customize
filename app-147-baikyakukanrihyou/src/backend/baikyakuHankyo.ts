import {fetchRecords} from './../../../kintone-api/typescript/fetchRecordsTS';
import {fetchGroupedAreas} from './shops';

const appId : number | null = 147;
let _area = {};

const fetchRecordsByYear = async () : Promise<KintoneTypes.SavedData[]> => {
  return (await fetchRecords({appId: appId, condition: ''})).records;
};

export const fetchBaikyakuHankyoGroupByArea = async () => {
  const [baikyakuHankyo, areas] = await Promise.all([fetchRecordsByYear(), fetchGroupedAreas()]);

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

export default fetchRecordsByYear;