import { getAppId } from './api';

const updateRecords = async ({ appId = getAppId(), records }) => {
  if (!records || !(records.length)) return 'No records passed';
  const body = {
    app: appId,
    records,
  };

  return kintone.api(
    kintone.api.url('/k/v1/records', true),
    'PUT',
    body,
  );
};

export default updateRecords;
