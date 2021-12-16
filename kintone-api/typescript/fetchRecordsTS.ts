import {getAppId} from './typedAPI';
declare const kintone : any;

interface KintoneAPIBody {
  condition?: string,
  appId :number | null,
  fields?: object[],
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