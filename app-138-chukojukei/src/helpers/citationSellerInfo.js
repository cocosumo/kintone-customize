import {fetchRecordById} from '../../../kintone-api/fetchRecords';

// 別アプリからの情報の引用設定を行う
export async function citationSellerInfo(event) {
  // kintoneAPIを利用して、顧客情報管理から情報を転記する
  const {
    record,
  } = event;

  const appId = 84;
  const recordId = record['_000_00_売主_レコード番号'].value;
  const param = {
    appId,
    recordId,
  };
  const sellerInfo = await fetchRecordById(param);
  console.log('売主情報', sellerInfo);


}