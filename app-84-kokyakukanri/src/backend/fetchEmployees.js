import { fetchRecords } from '../../../kintone-api/fetchRecords';
import { empListKey } from '../constants';
import excludedShopQuery from './utils';

const appId = 34;

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

export const fetchEmployees = () => fetchRecords({ appId });

export const getLocalEmpList = () => getStorageObj(empListKey);
