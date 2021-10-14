/* 社員データに関するモジュール */

import { fetchRecords } from '../../../kintone-api/fetchRecords';
import { excludedShopQuery, getStorageObj, setStorageObj } from './utils';

const appId = 34;

export const empListKey = 'app86社員リスト';

export const fetchEmployees = () => fetchRecords({ appId });

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

export const fetchNormalizedAgents = async () => (await fetchAgents())
  .map(({
    文字列＿氏名,
    ルックアップ＿店舗名,
  }) => ({
    name: 文字列＿氏名.value,
    shop: ルックアップ＿店舗名.value,
  }));

export const setLocalAgents = async () => setStorageObj(empListKey, await fetchNormalizedAgents());

export const getLocalAgents = () => getStorageObj(empListKey);

export const getAgentsByShop = (selectedShop) => getLocalAgents()
  .filter(({ shop }) => shop === selectedShop);
