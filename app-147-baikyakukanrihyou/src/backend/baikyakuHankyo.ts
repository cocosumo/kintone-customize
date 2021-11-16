import {fetchRecords} from './../../../kintone-api/typescript/fetchRecordsTS';
import {fetchGroupedAreas} from './shops';

const appId : number | null = 147;

const fetchRecordsByYear = async () : Promise<KintoneTypes.Data[]> => {
  return (await fetchRecords({appId: appId, condition: ''})).records;
};

export const fetchBaikyakuHankyoGroupByArea = async () => {
  const [baikyakuHankyo, areas] = await Promise.all([fetchRecordsByYear(), fetchGroupedAreas()]);

  const groupedByArea = baikyakuHankyo.reduce<any>((accu, curr) => {
    const {受付店舗} = curr;
    const current = accu[areas[受付店舗.value]];

    if (current) {

      current.push(curr);
      console.log(current, 'epic');
      return {...accu, ...{[areas[受付店舗.value]]: current}};
    }

    console.log(受付店舗.value, 'geel');
    return {...accu, ...{[areas[受付店舗.value]]: [curr]}};
  }, {});

  return groupedByArea;
};

export default fetchRecordsByYear;