import { fetchRecords } from '../../../kintone-api/fetchRecords';
import excludedShopQuery, { getStorageObj } from './utils';

const appId = 19;

export const shopListKey = 'app86店舗リスト';

export const fetchShop = () => fetchRecords(
  {
    appId,
    condition: excludedShopQuery(),
  },
);

export const getLocalShopList = () => getStorageObj(shopListKey);
