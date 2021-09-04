import { getAppId } from './api';

const deleteRecords = ({ appID = getAppId(), ids = [] }) => {
  if (!ids.length) return 'No ids to delete.';

  const body = {
    app: appID,
    ids,
  };

  return kintone.api(kintone.api.url(
    '/k/v1/records', true,
  ), 'DELETE', body);
};

export default deleteRecords;
