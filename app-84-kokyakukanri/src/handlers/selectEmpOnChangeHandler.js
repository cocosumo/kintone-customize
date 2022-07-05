import {getViewCode, selectEmpID, selectShopID} from '../view/utilsDOM';

/**
 * 担当名のプルダウンが変更されたときの処理
 */
const selectEmpOnChangeHandler = () => {
  if (document.getElementById(selectEmpID).value === 'listall') {
    // 「全レコードを表示」が選択された場合 -> 該当店舗の全てのレコードを表示
    const selectField = '店舗名'; // フィルタリング対象のフィールド名
    let shop = document.getElementById(selectShopID).value;
    if (shop.indexOf('店') !== -1) {
      shop = shop.substring(0, shop.indexOf('店'));
      // console.log('店舗名', shop);
    }
    const query = `${selectField} like "${shop}"`;
    window.location.href = `${window.location.origin
                        + window.location.pathname}?view=${getViewCode()}&query=${encodeURI(query)}`;
  } else if (document.getElementById(selectEmpID).value === 'init') {
    // デフォルト値が選択された場合 -> 何もしない
  } else {
    // 個人が選択された場合
    const selectField = '担当名'; // フィルタリング対象のフィールド名
    let member = document.getElementById(selectEmpID).value;
    // console.log('選択された社員：：', member);
    member = member.replace('　', ' ');
    const Firstname = member.slice(member.indexOf(' ') + 1);
    // console.log('苗字：：', Firstname);
    const Lastname = member.substring(0, member.indexOf(' '));
    // console.log('名前：：', Lastname);
    const query = `${selectField} like "${Lastname}" and ${selectField} like "${Firstname}"`;
    window.location.href = `${window.location.origin
                         + window.location.pathname}?view=${getViewCode()}&query=${encodeURI(query)}`;
  }
};

export default selectEmpOnChangeHandler;
