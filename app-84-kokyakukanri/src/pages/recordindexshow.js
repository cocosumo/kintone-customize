import {getHeaderSpaceElement} from '../../../kintone-api/api';
import {makeList} from '../backend/makeList';
import {setViewCode, selectEmpID, selectShopID, mySelectShop, mySelectEmp} from '../view/utilsDOM';
import selectShopOnChangeHandler from '../handlers/selectShopOnChangeHandler';
import selectEmpOnChangeHandler from '../handlers/selectEmpOnChangeHandler';
import {getLocalTimes} from '../backend/timeControl';
import {getLocalShops} from '../backend/fetchShop';
import {getAgentsByShop, getLocalAgents} from '../backend/fetchEmployees';
import {setHeaderMenuSpaceElementByReact} from '../view/setHeaderMenuSpace';
import {setSelectName, flg1st, affShop, selectName, FlgOcpChk, getLists, setAffiliationShop, setview} from '../backend/setName';

// [レコード一覧画面]プルダウンによる絞り込みを行う
const recordindexshow = (event) => {
  /* **************************************** 変数宣言部 **************************************** */
  // ローカルストレージの活用をする
  let app86DateTimeD; // 日時の保存データ
  let app86EmployeesD; // 社員リストの保存データ
  let app86ShopListD; // 店舗リストの保存データ
  const divTime = 20; // 経過時間の判定に使用する閾値(初期=10800秒=3時間で設定)

  /* **************************************** 関数宣言部 **************************************** */
  /* **************************************** 処理実装部 **************************************** */
  // ボタンの増殖防止
  if (document.getElementById(selectEmpID) !== null) {
    return;
  }

  // 指定の一覧以外このJSを実行しない
  if (event.viewType !== 'list') {
    return;
  }

  setViewCode(event.viewId);
  setHeaderMenuSpaceElementByReact(); // プルダウンメニューの要素を設定する

  getHeaderSpaceElement().append('※[担当名]には[店長][主任][営業]の方を表示しています\n');

  // 担当名に表示する氏名の取り出しをする
  setSelectName();
  /*  url = decodeURI(url); // urlをデコーディングする
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
  } */

  // LocalStrageに日時が保存されているか確認する - (1)
  app86DateTimeD = getLocalTimes();
  app86EmployeesD = getLocalAgents();
  app86ShopListD = getLocalShops();

  // localStorage.removeItem(shopListKey); // debag用、のちに削除すること

  console.log('1-1 経過時間(秒)：', (((Date.now()) / 1000) - app86DateTimeD));

  // (1-2)データが保存されていない場合 or 前回のデータの取得から3時間経過している場合
  if ((app86DateTimeD === null) || (app86EmployeesD === null)
   || (app86ShopListD === null) || (((Date.now() / 1000) - app86DateTimeD) >= divTime)) {
    getLists(); // 社員名簿アプリ及び、店舗リストアプリから一覧情報を取得する
  } else {
    // (1-1)(3-2)ローカルストレージにデータが保存されている場合 かつ、(2-2)3時間経過していない場合
    // - - - LocalStrageに保存されている店舗リスト(app86ShopListD)・社員リスト(app86EmployeesD)で処理する
    setAffiliationShop(app86EmployeesD); // 担当名(selectName)と、所属店舗(affShop)の更新

    // プルダウンの値を設定する
    makeList(app86ShopListD, selectShopID); // 店舗名
    // makeEmpList(app86EmployeesD, selectEmpID, affShop); // 担当名
    getAgentsByShop(affShop);
    console.log('ローカルストレージからの処理：初回判定 = ', flg1st, ', 営業職判定 = ', FlgOcpChk);
    console.log('店舗名', affShop, 'ユーザー名 = ', selectName);

    // 一覧の表示状態と、職種により、表示内容を切り替える
    setview();
  }

  // 店舗名のプルダウン変更時の処理 ⇒【！！！要対応！！！】以降、view/events.jsに処理を移管する
  const paramsShopChange = {
    TrgtArray: app86EmployeesD,
    Flag1st: flg1st,
    FlagOcp: FlgOcpChk,
    TrgtName: selectName
  };
  mySelectShop().onchange = () => selectShopOnChangeHandler(paramsShopChange);

  // 担当者のプルダウン変更時の処理
  mySelectEmp().onchange = () => selectEmpOnChangeHandler();
};

export default recordindexshow;
