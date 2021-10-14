/* 店舗データに関するモジュール */

import {fetchRecords} from '../../../kintone-api/fetchRecords';
import {getStorageObj, setStorageObj} from '../helpers';
import {excludedShopQuery} from './utils';

const appId = 19;

export const shopListKey = 'app86店舗リスト';

/**
 * 店舗レコードを取得
 *
 * @returns {Promise<object[]>} 店舗のKintoneレコード
 */
export const fetchShops = () => fetchRecords(
  {
    appId,
    condition: excludedShopQuery(),
  },
);

/**
 * Kintoneレコード取得し、string配列に変える。
 *
 * @returns {string[]} 店舗リスト
 */
export const fetchNormalizedShops = async () => (await fetchShops())
  .map(({店舗名}) => 店舗名.value);

/**
 * localStorageに店舗リストを格納
 *
 * @returns {void}
 */
export const setLocalShops = async () => setStorageObj(shopListKey, await fetchNormalizedShops());

/**
 * localStorageから店舗リストを取得
 *
 * @returns {string[]} 店舗リスト
 */
export const getLocalShops = () => getStorageObj(shopListKey);
