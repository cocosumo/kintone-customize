import {getAppId} from '../api';

interface KintoneAPIBody {
  condition : '',
  appId :typeof getAppId,
  fields : string[],
}

export const fetchRecords = ({
  condition = '',
  appId = getAppId(),
  fields = [],
} : KintoneAPIBody) => {
  const body = {
    app: appId,
    query: condition,
    fields,
  };
  return kintone.api(
    kintone.api.url('/k/v1/records', true),
    'GET',
    body,
  );
};