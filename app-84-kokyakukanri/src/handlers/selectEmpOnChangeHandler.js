import { selectEmpID, selectShopID } from '../view/utilsDOM'

/**
 * 担当名のプルダウンが変更されたときの処理
 * @param {integer} view : 一覧表示をするID(viewID)
 */
const selectEmpOnChangeHandler = (view) => {
  if (document.getElementById(selectEmpID).value === 'listall') {
    // 該当店舗の全てのレコードを表示
    const selectField = '店舗名'; // フィルタリング対象のフィールド名
    let shop = document.getElementById(selectShopID).value;
    if (shop.indexOf('店') !== -1) {
      shop = shop.substring(0, shop.indexOf('店'));
      // console.log('店舗名', shop);
    }
    const query = `${selectField} like "${shop}"`;
    window.location.href = `${window.location.origin
                        + window.location.pathname}?view=${view}&query=${encodeURI(query)}`;
  } else if (document.getElementById(selectEmpID).value === 'init') {
    // デフォルト値・何もしない
  } else {
    const selectField = '担当名'; // フィルタリング対象のフィールド名
    const member = document.getElementById(selectEmpID).value;
    const Firstname = member.slice(member.indexOf(' ') + 1);
    const Lastname = member.substring(0, member.indexOf(' '));
    const query = `${selectField} like "${Lastname}" and ${selectField} like "${Firstname}"`;
    window.location.href = `${window.location.origin
                         + window.location.pathname}?view=${view}&query=${encodeURI(query)}`;
  }
};

export default selectEmpOnChangeHandler;
