import { getAppId } from '../../../kintone-api/api';

const settingsId = 82;

const fetchSettings = () => {
  const body = {
    app: settingsId,
    query: `コード="${getAppId()}"`,
  };
  return kintone.api(
    kintone.api.url('/k/v1/records', true),
    'GET',
    body,
  );
};

export const getSettings = () => JSON.parse(localStorage.getItem('選択肢'));

export const getActionTypeData = (actionName) => getSettings();

export default fetchSettings;
