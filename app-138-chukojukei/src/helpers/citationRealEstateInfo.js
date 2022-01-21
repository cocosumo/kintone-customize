
// 別アプリからの情報の引用設定を行う
export const citationRealEstateInfo = (event) =>{
  // kintoneAPIを利用して、顧客情報管理から情報を転記する
  const {
    record,
  } = event;

  const appId = 137;
  const recordId = record['_000_00_物件_レコード番号'].value;
  const param = {
    app: appId,
    id: recordId,
  };

  getRealEstateInfo(param); // 売主のレコード取得情報処理(顧客管理より)
};


const getRealEstateInfo = (param) => {
  kintone.api(
    kintone.api.url('/k/v1/record.json', true),
    'GET', param,
    (resp) => {
      let address = resp.record['県'].value;
      address += resp.record['市'].value;
      const banchi = resp.record['町名＿番地'].value;

      // kintone.apiで他のアプリから取得したデータをフィールドに入れるコード
      const obj = kintone.app.record.get();
      obj.record._000_02_土地1所在.value = address;

      kintone.app.record.set(obj); // 現在のレコードに値を反映する
    }, (error) => {
      console.log(error);
    }
  );

};