import { getAppId } from './api';

const updateStatus = ({
  id, appId = getAppId(), action = '承認する', assignee,
}) => {
  const body = {
    app: appId,
    id,
    action,
    assignee,
  };
  console.log(body, 'body');
  return kintone.api(kintone.api.url('/k/v1/record/status.json', true), 'PUT', body);
};

export const updateAllStatus = ({
  ids, appId = getAppId(), action = '承認する', assignee,
}) => {
  if (!ids) return null;

  const recsToUpdateStatus = ids.map((id) => ({
    id,
    action,
    assignee,
  }));

  const body = {
    app: appId,
    records: recsToUpdateStatus,
  };
  return kintone.api(kintone.api.url('/k/v1/records/status.json', true), 'PUT', body)
    .catch((reason) => console.warn('error: ', reason.message));
};

export default updateStatus;
