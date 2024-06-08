import {getEnvAppId} from '../helpers/env';

const settingsId = 82;
const envAppId = getEnvAppId();

const fetchSettings = () => {
  const body = {
    app: settingsId,
    query: `コード="${envAppId}"`,
  };

  console.log('Fetching settings from settingsAppId: ', envAppId);

  return kintone.api(
    kintone.api.url('/k/v1/records', true),
    'GET',
    body,
  );
};

export const getSettings = (key) => JSON.parse(localStorage.getItem(key));

export const getOptions = () => getSettings('選択肢');

export const getActionTypeData = (actionName) => getOptions()
  .find(({type}) => type === actionName);

export default fetchSettings;
