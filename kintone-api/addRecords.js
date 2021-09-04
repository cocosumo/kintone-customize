import { getAppId } from './api';

const addRecords = async ({ appId = getAppId(), records }) => {
  if (!records || !(records.length)) return 'No records passed';
  const body = {
    app: appId,
    records,
  };

  console.log(body, [
    {
      Text: {
        value: 'Sample001',
      },
      Number: {
        value: 1,
      },
    },
    {
      Text: {
        value: 'Sample002',
      },
      Number: {
        value: 2,
      },
    },
  ]);

  return kintone.api(
    kintone.api.url('/k/v1/records', true),
    'POST',
    body,
  );
};

export default addRecords;
