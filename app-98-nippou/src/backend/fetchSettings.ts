import { getEnvAppId } from '../helpers/env';

const settingsAppId = 82;

const fetchSettings = (appId: number | null = null) => {
  const body = {
    app: settingsAppId,
    query: `コード="${appId || getEnvAppId()}"`,
  };

  return kintone.api(
    kintone.api.url('/k/v1/records', true),
    'GET',
    body,
  );
};

export const getSettings = (key) => JSON.parse(localStorage.getItem(key) || '{}');

export const getOptions = () => getSettings('選択肢');

export const getActionTypeData = (actionName) => getOptions()
  .find(({ type }) => type === actionName);

export default fetchSettings;
