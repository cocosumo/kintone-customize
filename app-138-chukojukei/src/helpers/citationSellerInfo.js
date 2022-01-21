
// 別アプリからの情報の引用設定を行う
export const citationSellerInfo = (event) =>{
  // kintoneAPIを利用して、顧客情報管理から情報を転記する
  const {
    record,
  } = event;

  const appId = 84;
  const recordId = record['_000_00_売主_レコード番号'].value;
  const param = {
    app: appId,
    id: recordId,
  };

  getSellerInfo(param); // 売主のレコード取得情報処理(顧客管理より)
};


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