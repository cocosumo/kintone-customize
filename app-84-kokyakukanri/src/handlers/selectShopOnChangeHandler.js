import {selectShopID, selectEmpID} from '../view/utilsDOM';
import {makeEmpList} from '../backend/makeList';
import {flg1st, FlgOcpChk, selectName} from '../backend/setName';

/**
 * 店舗名のプルダウンが変更されたときの処理
 *
 */
const selectShopOnChangeHandler = () => {
  const viewall = 20; // (すべて)の一覧ID：本番用・テスト用共通 = 20

  const affShop = document.getElementById(selectShopID).value;
  // console.log('店舗名のプルダウンに変更あり 所属店舗= ', affShop);
  if (affShop === 'listall') {
    // '全てのレコードを表示'の時の処理
    window.location.href = `${window.location.origin
                            + window.location.pathname}?view=${viewall}`;
  } else if (affShop === 'init') {
    // 【選択してください】の時は何もしない
  } else {
    $(`#${selectEmpID} > option`).remove(); // プルダウン子要素の初期化
    makeEmpList(selectEmpID, affShop); // 社員名のリスト(プルダウン)の更新

    if (flg1st === false || FlgOcpChk === false) {
      document.getElementById(selectEmpID).value = 'init'; // 店舗が変更されたときは、担当名も初期表示に戻す
    } else {
      document.getElementById(selectEmpID).value = selectName; // 担当名を設定
    }
  }
};

export default selectShopOnChangeHandler;
