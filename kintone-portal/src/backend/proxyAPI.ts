import {AUTH, DOMAIN} from '../../utils';

interface Params {
  app: string;
  query?: string;
}


export const getRecordsByProxy = async (params : Params) => {
  console.log(params.query);
  const headers = {
    'X-Cybozu-API-Token': AUTH,
    'Content-Type': 'application/json',
    'X-HTTP-Method-Override': 'GET',
  };

  const url = `https://${DOMAIN}/k/v1/records.json`;

  const [body, status] = await kintone.proxy(`${url}`, 'POST', headers, params);
  const {records, message} = JSON.parse(body);

  return status === 200 ? records : message;
};