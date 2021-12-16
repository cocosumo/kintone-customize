import {fetchRecords} from './../../../kintone-api/typescript/fetchRecordsTS';

const appId : number | null = 19;

const fetchAreas = () : ShopRecords => {
  return fetchRecords({appId: appId, condition: 'area != ""'});
};

export const fetchGroupedAreas = async () : Promise<GroupedRecords> => {
  return (await fetchAreas())
    .records
    .reduce((
      accu: GroupedRecords,
      curr: Shop
    ) => {
      const {area, 店舗名} = curr;

      return {...accu, ...{[店舗名.value]: area.value}};
    }, {});
};

export default fetchAreas;