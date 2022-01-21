
/**
 * 顧客管理から、買主情報の引用設定を行う
 * @param {*} event
 */
export const citationBuyerInfo = (event) =>{
  // kintoneAPIを利用して、顧客情報管理から情報を転記する
  const {
    record,
  } = event;
  const recordId = record['_000_00_買主_レコード番号'].value;

  if (recordId) {
    const appId = 84;
    const param = {
      app: appId,
      id: recordId,
    };

    // kintoneAPIを利用して、物件管理から情報を転記する
    getBuyerInfo(param);
  }
};


const getBuyerInfo = (param) => {
  kintone.api(
    kintone.api.url('/k/v1/record.json', true),
    'GET', param,
    (resp) => {
      const buyerName = resp.record['氏名'].value;

      // kintone.apiで他のアプリから取得したデータをフィールドに入れるコード
      const obj = kintone.app.record.get();
      obj.record._000_00_買主氏名.value = buyerName;

      kintone.app.record.set(obj); // 現在のレコードに値を反映する
    }, (error) => {
      console.log(error);
    }
  );

};