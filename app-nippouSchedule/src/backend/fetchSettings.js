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

export const getSettings = (key) => JSON.parse(localStorage.getItem(key));

export const getOptions = () => getSettings('選択肢');

export const getActionTypeData = (actionName) => getSettings()
  .find(({ type }) => type === actionName);

export default fetchSettings;
