/* 社員データに関するモジュール */

import { fetchRecords } from '../../../kintone-api/fetchRecords';
import { excludedShopQuery, getStorageObj, setStorageObj } from './utils';

const appId = 34;

export const empListKey = 'app86社員リスト';

/**
 * 絞りなしですべての社員レコードを取得
 * @returns { Promise<KintoneRecords[]> } 取得したKintoneのレコード
 */
export const fetchEmployees = () => fetchRecords({ appId });

/**
 * 営業職？の担当者レコードのみ取得
 * @returns { Promise<KintoneRecords[]> } 取得したKintoneのレコード
 */
export const fetchAgents = () => fetchRecords(
  {
    appId,
    fields: ['文字列＿氏名', '役職', 'ルックアップ＿店舗名', '状態'],
    condition: [
      '状態 not in ("無効")',
      '役職 in ("営業","主任","店長")',
      excludedShopQuery('ルックアップ＿店舗名'),
    ].join(' and '),
  },
);

/**
 * KintoneRecords[]を新な配列に変える。
 * @returns  { Promise<Array.<{name: string, shop: string}>> }
 */
export const fetchNormalizedAgents = async () => (await fetchAgents())
  .map(({
    文字列＿氏名,
    ルックアップ＿店舗名,
  }) => ({
    name: 文字列＿氏名.value,
    shop: ルックアップ＿店舗名.value,
  }));

/**
 * 変形した社員情報をlocalStorageに保存。
 */
export const setLocalAgents = async () => setStorageObj(empListKey, await fetchNormalizedAgents());

/**
 * localStorageから社員情報をすべて取得
 */
export const getLocalAgents = () => getStorageObj(empListKey);

/**
 * 店舗で絞って、社員レコードを取得
 * @param {string} selectedShop, 店舗名
 * @returns {Array.<{name: string, shop: string}>}, 社員レコード配列
 */
export const getAgentsByShop = (selectedShop) => getLocalAgents()
  .filter(({ shop }) => shop === selectedShop);
