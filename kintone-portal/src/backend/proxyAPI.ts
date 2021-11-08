import {AUTH, DOMAIN} from '../../utils';


export const getRecordsByProxy = async (params : KintoneAPIBody) => {

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

export const getFileByFileKey = async (fileKey: string) => {

  const headers = {
    'X-Cybozu-API-Token': AUTH,
    'Content-Type': 'application/octet-stream',
    'X-HTTP-Method-Override': 'GET',
  };

  const url = `https://${DOMAIN}/k/v1/file.json?fileKey=${fileKey}`;

  const resp = await kintone.proxy(`${url}`, 'GET', headers, {});
  const [fileBlob, status, responseHeaders] = resp;


  const file = new Blob([fileBlob], {type: 'application/pdf'});
  const fileURL = URL.createObjectURL(file);

  window.open(fileURL);

  console.log(fileURL, status, responseHeaders);


};

