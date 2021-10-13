import { fetchRecords } from '../../../kintone-api/fetchRecords';
import excludedShopQuery, { getStorageObj } from './utils';

const appId = 19;

const fetchShop = () => fetchRecords(
  {
    appId,
    condition: excludedShopQuery(),
  },
);

export const getLocalShopList = () => getStorageObj(shopListKey);

export default fetchShop;
