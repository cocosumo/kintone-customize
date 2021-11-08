import {getAppId} from '../../../kintone-api/typedAPI';


export const fetchRecords = ({
  query = '',
  app = getAppId(),
  fields = [],
} : KintoneAPIBody) => {
  const body = {
    app: app,
    query: query,
    fields: fields,
  };
  return kintone.api(
    kintone.api.url('/k/v1/records', true),
    'GET',
    body,
  );
};