import {selectShopID, selectEmpID, getViewCode} from '../view/utilsDOM';
import {setLocalTimes} from '../backend/timeControl';
import chkOccupation from './chkOccupation';
import {setLocalAgents, getLocalAgents} from './fetchEmployees';
import {setLocalShops, getLocalShops} from './fetchShop';
import {makeEmpList, makeList} from './makeList';

export let flg1st;
export let affShop;
export let selectName; // 選択されている社員名(初期値はログインユーザー名)
export let FlgOcpChk;
export let app86EmployeesD;

let selectNameL; // ログインユーザーの苗字
let selectNameF; // ログインユーザーの名前

/**
 * 担当名に表示する名前を取り出す
 */
export const setSelectName = () => {
  const url = decodeURI(window.location.search); // urlをデコーディングする
  flg1st = false;
  FlgOcpChk = false;

  // URLにqueryが含まれないとき(初回)
  if ((url.indexOf('query=') === -1) && (url.indexOf('q=') === -1)) {
    flg1st = true;
    selectName = kintone.getLoginUser().name;
    selectNameL = selectName.substring(0, selectName.indexOf(' '));
    selectNameF = selectName.slice(selectName.indexOf(' ') + 1);
    selectName = selectNameL.concat(' ', selectNameF);
    affShop = 'init';
    console.log('ユーザ名の取得 :', selectName);
  } else {
    // URLにプルダウンで指定したqueryが含まれる場合の処理
    flg1st = false;
    let resultPos = url.indexOf('担当名');
    if (resultPos !== -1) { // URLに'担当名'が含まれるとき
      // ここから：絞り込み条件の氏名を取り出す 「query=担当名 like "苗字" and 担当名 like "名前"」
      selectName = url.slice(resultPos + 10); // 10=読み飛ばす文字数
      resultPos = selectName.indexOf('担当名');
      selectNameL = selectName.substring(0, resultPos - 6);
      selectName = selectName.slice(resultPos + 10);
      selectNameF = selectName.substring(0, selectName.indexOf('"'));
      selectName = selectNameL.concat(' ', selectNameF);
      affShop = 'init';
    } else if (url.indexOf('店舗名') !== -1) { // URLに'店舗名'が含まれるとき
      resultPos = url.indexOf('店舗名');
      affShop = url.slice(resultPos + 10); // 10=読み飛ばす文字数
      affShop = `${affShop.substring(0, affShop.indexOf('"'))}店`;
      selectName = 'init';
    } else {
      // ユーザがプルダウン以外で絞り込み表示している場合
      // 処理は実行しない
    }
  }
};

/**
 * 社員リストを更新する
 */
export const updateAgents = () => {
  app86EmployeesD = getLocalAgents();
};

/**
 * 該当の社員名(selectName)の所属店舗をaffShopに格納する処理
 *
 */
export function setAffiliationShop() {
  if (affShop === 'init') {
    affShop = chkOccupation(app86EmployeesD, selectName);
    if (affShop !== 'init') {
      FlgOcpChk = true;
    } else {
      // FlgOcpChk = false; //初期値=falseのため、処理省略
      selectName = 'init';
    }
  }
}

/**
 * プルダウンの内容表示を切り替える処理
 *
 */
export function setview() {
  // 所属店舗の値を更新する
  setAffiliationShop();

  // 一覧の表示状態と、職種により、表示内容を切り替える
  if (!FlgOcpChk) {
    // console.log('営業職ではない');
    if (affShop !== 'init') {
      document.getElementById(selectShopID).value = affShop;
      document.getElementById(selectEmpID).value = 'listall';
    } else {
      document.getElementById(selectShopID).value = 'init';
      document.getElementById(selectEmpID).value = 'init';
    }
  } else if (flg1st) {
    // 初回にログインユーザー名でフィルタリングする
    // console.log('初回 かつ 営業職');
    const selectField = '担当名'; // フィルタリング対象のフィールド名
    const query = `${selectField} like "${selectNameL}" and ${selectField} like "${selectNameF}"`;
    // console.log('query = ', query);
    window.location.href = `${window.location.origin
                            + window.location.pathname}?view=${getViewCode()}&query=${encodeURI(query)}`;
  } else if (!flg1st) {
    // 初回ログインではない場合
    // console.log('初回ではない かつ 営業職:', affShop, ' ', selectName);
    document.getElementById(selectShopID).value = affShop;
    document.getElementById(selectEmpID).value = selectName;
  }
}

/**
 * プルダウン店舗名と担当名のメンバを取得(作成)する
 */
export async function getLists() {
  await setLocalShops(); // 店舗リストのデータ取得とローカルストレージへの格納
  await setLocalAgents(); // 社員リストのデータ取得とローカルストレージへの格納
  setLocalTimes(); // 現在の日時を、LocalStrageに格納する

  // 絞り込み表示対象者の所属店舗を設定する
  updateAgents();
  setAffiliationShop(); // 担当名(selectName)と、所属店舗(affShop)の更新
  console.log('APIリクエスト時の処理：初回判定 = ', flg1st, ', 営業職判定 = ', FlgOcpChk);
  console.log('店舗名', affShop, 'ユーザー名 = ', selectName);

  // プルダウンに選択肢を追加する
  makeList(getLocalShops(), selectShopID); // 店舗名
  makeEmpList(selectEmpID, affShop); // 担当名

  // 一覧の表示状態と、職種により、表示内容を切り替える
  setview();
}
