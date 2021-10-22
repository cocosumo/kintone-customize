import {selectShopID, selectEmpID} from '../view/utilsDOM';
import {makeEmpList} from '../backend/makeList';

/**
 * 店舗名のプルダウンが変更されたときの処理
 *
 * @param {
 *   @param TrgtArray, 対象の社員名のみが保存されている配列
 *   @param Flag1st, 初回かどうか判定するフラグ(True:初回, False:初回以外)
 *   @param FlagOcp, 営業職かどうか判定するフラグ(True:営業職(主任・店長含む), false:営業職ではない)
 *   @param TrgtName, 対象者の氏名
 * }
 * @param _params
 */
const selectShopOnChangeHandler = (_params) => {
  const app86EmployeesD = _params.TrgtArray;
  const flg1st = _params.Flag1st;
  const FlgOcpChk = _params.FlagOcp;
  let selectName = _params.TrgtName;
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
    makeEmpList(app86EmployeesD, selectEmpID, affShop); // 社員名のリスト(プルダウン)の更新

    if (flg1st === false || FlgOcpChk === false) {
      selectName = 'init'; // 店舗が変更されたときは、担当名も初期表示に戻す
    }
    document.getElementById(selectEmpID).value = selectName; // 担当名を設定
  }
};

export default selectShopOnChangeHandler;
