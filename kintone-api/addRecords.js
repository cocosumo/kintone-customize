import {getAppId} from './api';

const addRecords = async ({appId = getAppId(), records}) => {
  if (!records || !(records.length)) return 'No records passed';
  const body = {
    app: appId,
    records,
  };

  return kintone.api(
    kintone.api.url('/k/v1/records', true),
    'POST',
    body,
  );
};

export default addRecords;
