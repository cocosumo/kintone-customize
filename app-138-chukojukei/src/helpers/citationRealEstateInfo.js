/**
 * 別アプリからの情報の引用設定を行う
 * @param {*} event
 */
export const citationRealEstateInfo = (event) =>{
  const {
    record,
  } = event;

  const recordId = record['_000_00_物件_レコード番号'].value;

  if (recordId) {
    const appId = 137;
    const param = {
      app: appId,
      id: recordId,
    };

    // kintoneAPIを利用して、物件管理から情報を転記する
    getRealEstateInfo(param);
  }
};

/**
 * 物件管理の情報を取り出し、契約書へ反映する処理
 * @param {obj}} param :アプリIDと、レコードIDのオブジェクト
 */
const getRealEstateInfo = (param) => {
  kintone.api(
    kintone.api.url('/k/v1/record.json', true),
    'GET', param,
    (resp) => {
      const obj = kintone.app.record.get();

      const address = resp.record['都道府県'].value + resp.record['市区町村'].value + resp.record['町域'].value;
      const subaddress = pickOutBanchi(resp.record['以降番地'].value);
      setTypesOfLandRights(resp.record['土地権利種別'].value, obj);
      setTypesOfLandArea(resp.record['土地面積種別'], obj, resp);

      // kintone.apiで他のアプリから取得したデータをフィールドに入れるコード
      obj.record['_000_00_取引態様'].value = resp.record['業者取引態様'].value;
      obj.record['_000_02_土地1所在'].value = address;
      obj.record['_000_02_土地1番'].value = subaddress.banchi;
      obj.record['_000_02_土地1地'].value = subaddress.gouchi;
      obj.record['_000_02_土地1地目'].value = resp.record['地目種別'].value;
      obj.record['_000_02_土地1地積'].value = resp.record['面積_m2'].value;

      kintone.app.record.set(obj); // 現在のレコードに値を反映する
    }, (error) => {
      console.log(error);
    }
  );

};

/**
 * 番地以降の情報から、番地と番地より後を分割する処理
 * @param {string} val : 物件情報管理アプリの「以降番地」のデータ
 * @returns : 番地と号地の情報が含まれるオブジェクト
 */
const pickOutBanchi = (val) => {
  let banchi;
  let gouchi;
  const searchWords = ['番地', '番', '-'];

  for (let i = 0; i <= searchWords.length; i++) {
    if (val.includes(searchWords[i])) {
      banchi = val.split(searchWords[i])[0];
      gouchi = val.substring(banchi.length + searchWords[i].length);
      break;
    }
  }
  const addressBanchi = {
    'banchi': banchi,
    'gouchi': gouchi,
  };

  return addressBanchi;
};

/**
 * 土地権利の種類を設定する
 * @param {string} val :物件管理、土地権利種別の入力値
 */
const setTypesOfLandRights = (val, obj) => {
  if (val) {
    if (val.includes('所有権')) {
      obj.record['_000_02_土地権利の種類'].value = '所有権';
    } else {
      obj.record['_000_02_土地権利の種類'].value = '借地権';
      if (val.includes('賃借権')) {
        obj.record['_000_02_土地借地権の詳細'].value = '賃借権';
      } else if (val.includes('地上権')) {
        obj.record['_000_02_土地借地権の詳細'].value = '地上権';
      }
    }
  }
};

/**
 * 物件管理の土地面積種別の値を、土地・面積の確定に設定する
 * @param {string} val :物件管理、土地面積種別の値
 * @param {object} obj :現在入力中のレコード
 * @param {object} resp :引用元(物件管理)のレコード
 */
const setTypesOfLandArea = (val, obj, resp)=> {
  if (val) {
    if (val === '公') {
      obj.record['_000_02_土地・面積の確定1'].value = '登記簿(公簿)面積による';
    } else {
      obj.record['_000_02_土地・面積の確定1'].value = '実測面積による';
      if (resp.record['面積_m2'].value) {
        obj.record['_000_02_土地・面積の確定2'].value = '実測済み';
        obj.record['_000_02_土地・面積の確定3'].value = resp.record['面積_m2'].value;
      } else {
        obj.record['_000_02_土地・面積の確定2'].value = '未了';
      }
    }
  }
};