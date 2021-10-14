/* 店舗データに関するモジュール */

import { fetchRecords } from '../../../kintone-api/fetchRecords';
import { excludedShopQuery, getStorageObj, setStorageObj } from './utils';

const appId = 19;

export const shopListKey = 'app86店舗リスト';

export const fetchShops = () => fetchRecords(
  {
    appId,
    condition: excludedShopQuery(),
  },
);

export const fetchNormalizedShops = async () => (await fetchShops())
  .map(({ 店舗名 }) => 店舗名.value);

export const setLocalShops = async () => setStorageObj(shopListKey, await fetchNormalizedShops());

export const getLocalShops = () => getStorageObj(shopListKey);
