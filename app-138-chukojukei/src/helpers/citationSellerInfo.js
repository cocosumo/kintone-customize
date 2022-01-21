
/**
 * 顧客管理から、売主情報の引用設定を行う
 * @param {*} event
 */
export const citationSellerInfo = (event) =>{
  // kintoneAPIを利用して、顧客情報管理から情報を転記する
  const {
    record,
  } = event;
  const recordId = record['_000_00_売主_レコード番号'].value;

  if (recordId) {
    const appId = 84;
    const param = {
      app: appId,
      id: recordId,
    };

    // kintoneAPIを利用して、物件管理から情報を転記する
    getSellerInfo(param);
  }
};

/**
 * 顧客管理の情報を取り出し、契約書へ反映する処理
 * @param {obj}} param :アプリIDと、レコードIDのオブジェクト
 */
const getSellerInfo = (param) => {
  kintone.api(
    kintone.api.url('/k/v1/record.json', true),
    'GET', param,
    (resp) => {
      const sellerName = resp.record['氏名'].value;
      let address = resp.record['県'].value;
      address += resp.record['市'].value;
      address += resp.record['町名＿番地'].value;


      // kintone.apiで他のアプリから取得したデータをフィールドに入れるコード
      const obj = kintone.app.record.get();
      obj.record._000_00_売主氏名.value = sellerName;
      obj.record._000_04_売主住所.value = address;
      obj.record._000_04_売主氏名.value = sellerName;
      obj.record._101_01_土地名義人氏名.value = sellerName;
      obj.record._101_01_土地名義人住所.value = address;
      obj.record._101_02_建物名義人氏名.value = sellerName;
      obj.record._101_02_建物名義人住所.value = address;

      kintone.app.record.set(obj);

    }, (error) => {
      console.log(error);
    }
  );

};