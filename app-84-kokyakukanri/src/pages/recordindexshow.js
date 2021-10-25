import {getHeaderSpaceElement} from '../../../kintone-api/api';
import {makeEmpList, makeList} from '../backend/makeList';
import {setViewCode, selectEmpID, selectShopID} from '../view/utilsDOM';
import addEvents from '../view/events';
import {getLocalTimes} from '../backend/timeControl';
import {getLocalShops} from '../backend/fetchShop';
import {getLocalAgents} from '../backend/fetchEmployees';
import {setHeaderMenuSpaceElementByReact} from '../view/setHeaderMenuSpace';
import {setSelectName, flg1st, affShop, selectName, FlgOcpChk, getLists, setAffiliationShop, setview} from '../backend/setName';

// [レコード一覧画面]プルダウンによる絞り込みを行う
const recordindexshow = (event) => {
  // ローカルストレージの活用をする
  const app86DateTimeD = getLocalTimes(); // 日時の保存データ
  const app86EmployeesD = getLocalAgents(); // 社員リストの保存データ
  const app86ShopListD = getLocalShops(); // 店舗リストの保存データ
  const divTime = 10800; // 経過時間の判定に使用する閾値(初期=10800秒=3時間で設定)

  // ボタンの増殖防止
  if (document.getElementById(selectEmpID) !== null) {
    return;
  }

  // 指定の一覧以外このJSを実行しない
  if (event.viewType !== 'list') {
    return;
  }

  setViewCode(event.viewId); // 一覧viewIDの保存
  setHeaderMenuSpaceElementByReact(); // プルダウンメニューの要素を設定する
  getHeaderSpaceElement().append('※[担当名]には[店長][主任][営業]の方を表示しています\n');
  setSelectName(); // 担当名に表示する氏名の取り出しをする
  console.log('1-1 経過時間(秒)：', (((Date.now()) / 1000) - app86DateTimeD));

  if ((app86DateTimeD === null) || (app86EmployeesD === null)
   || (app86ShopListD === null) || (((Date.now() / 1000) - app86DateTimeD) >= divTime)) {
    // (1-2)データが保存されていない場合 or 前回のデータの取得から3時間経過している場合
    // 社員名簿アプリ及び、店舗リストアプリから一覧情報を取得する
    getLists();
  } else {
    // (1-1)(3-2)ローカルストレージにデータが保存されている場合 かつ、(2-2)3時間経過していない場合
    // - - - LocalStrageに保存されている店舗リスト(app86ShopListD)・社員リスト(app86EmployeesD)で処理する
    setAffiliationShop(app86EmployeesD); // 担当名(selectName)と、所属店舗(affShop)の更新

    // プルダウンの値を設定する
    makeList(app86ShopListD, selectShopID); // 店舗名
    makeEmpList(app86EmployeesD, selectEmpID, affShop);
    // getAgentsByShop(affShop);
    console.log('ローカルストレージからの処理：初回判定 = ', flg1st, ', 営業職判定 = ', FlgOcpChk);
    console.log('店舗名', affShop, 'ユーザー名 = ', selectName);

    // 一覧の表示状態と、職種により、表示内容を切り替える
    setview(app86EmployeesD);
  }

  addEvents();
};

export default recordindexshow;
