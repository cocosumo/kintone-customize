/* 社員データに関するモジュール */

import {fetchRecords} from '../../../kintone-api/fetchRecords';
import {getStorageObj, setStorageObj} from '../helpers';
import {excludedShopQuery} from './utils';

const appId = 34;

export const empListKey = 'app86社員リスト';

/**
 * 絞りなしですべての社員レコードを取得
 *
 * @returns { Promise<object[]> } 取得したKintoneのレコード
 */
export const fetchEmployees = () => fetchRecords({appId});

/**
 * 営業職？の担当者レコードのみ取得
 *
 * @returns { Promise<object[]> } 取得したKintoneのレコード
 */
export const fetchAgents = () => fetchRecords(
  {
    appId,
    fields: ['文字列＿氏名', '役職', 'mainStore', '状態'],
    condition: [
      '状態 not in ("無効")',
      '役職 in ("営業","主任","店長")',
      excludedShopQuery('mainStore'),
    ].join(' and '),
  },
);

/**
 * KintoneRecords[]を新な配列に変える。
 *
 * @returns  { Promise<Array.<{name: string, shop: string}>> } 社員の氏名と店舗
 */
export const fetchNormalizedAgents = async () => (await fetchAgents())
  .records
  .map(({
    文字列＿氏名,
    mainStore,
  }) => ({
    name: 文字列＿氏名.value,
    shop: mainStore.value,
  }));

/**
 * 変形した社員情報をlocalStorageに保存。
 *
 * @returns {void}
 */
export const setLocalAgents = async () => setStorageObj(empListKey, await fetchNormalizedAgents());

/**
 * localStorageから社員情報をすべて取得
 *
 * @returns {Array.<{name: string, shop: string}>} 社員レコード配列
 */
export const getLocalAgents = () => getStorageObj(empListKey);

/**
 * 店舗で絞って、localStorageから社員の氏名と所属店舗を取得
 *
 * @param {string} [selectedShop = null] 店舗名, nullまたは指定しなかった場合、全部取得する。
 * @returns {Array.<{name: string, shop: string}>} 社員レコード配列
 */
export const getAgentsByShop = (selectedShop = null) => (
  selectedShop
    ? getLocalAgents()
      .filter(({shop}) => shop === selectedShop)
    : getLocalAgents()
);

/**
 * 店舗で絞って、社員の氏名だけ取得する
 *
 * @param {string} selectedShop 店舗名
 * @returns {string[]} 氏名配列
 */
export const getAgentsNamesByShop = (selectedShop) => getAgentsByShop(selectedShop)
  .map(({name}) => name);
