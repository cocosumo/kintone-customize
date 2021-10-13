import { getHeaderMenuSpaceElement, getHeaderSpaceElement, isMobile } from '../../../kintone-api/api';
import { fetchAllRecords } from '../../../kintone-api/fetchRecords';
import { makeList, makeEmpList } from '../functions/makeList';
import chkOccupation from '../functions/chkOccupation';

// [レコード一覧画面]プルダウンによる絞り込みを行う
const recordindexshow = (event) => {
  /* **************************************** 変数宣言部 **************************************** */
  let view; // 現在の一覧ID
  const viewall = 20; // (すべて)の一覧ID：本番用・テスト用共通 = 20
  const EmpIDname = 'my_selectEmp';
  const ShopIDname = 'my_selectShop';

  let affShop = 'init'; // 店舗名の初期値を格納する変数
  let selectName; // 選択されている社員名(初期値はログインユーザー名)
  let selectNameL; // ログインユーザーの苗字
  let selectNameF; // ログインユーザーの名前
  let flg1st = false; // 初回判定用フラグ true=初回, false=初回ではない
  let FlgOcpChk = false; // 対象社員の職種を確認するフラグ true:営業, false:営業以外
  let url = window.location.search;

  // ローカルストレージの活用をする
  const app86DateTimeKey = 'app86日時'; // 日時の保存名(キー)
  let app86DateTimeD; // 日時の保存データ
  const app86EmployeesKey = 'app86社員リスト'; // 社員リストの保存名(キー)
  let app86EmployeesD; // 社員リストの保存データ
  const app86ShopListKey = 'app86店舗リスト'; // 店舗リストの保存名(キー)
  let app86ShopListD; // 店舗リストの保存データ
  const divTime = 10800; // 経過時間の判定に使用する閾値(初期=10800秒=3時間で設定)

  /* **************************************** 関数宣言部 **************************************** */
  /**
   * 該当の社員名(selectName)の所属店舗をaffShopに格納する処理
   * @param {array} lists : 社員名簿のリスト[{ name: 氏名, shop: 店舗}]
   */
  function setAffiliationShop(lists) {
    if (affShop === 'init') {
      affShop = chkOccupation(lists, selectName);
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
   */
  function setview() {
    // 所属店舗の値を更新する
    setAffiliationShop(app86EmployeesD);

    // 一覧の表示状態と、職種により、表示内容を切り替える
    if (FlgOcpChk === false) {
      // console.log('営業職ではない');
      if (affShop !== 'init') {
        document.getElementById(ShopIDname).value = affShop;
        document.getElementById(EmpIDname).value = 'listall';
      } else {
        document.getElementById(ShopIDname).value = 'init';
        document.getElementById(EmpIDname).value = 'init';
      }
    } else if (flg1st === true) {
      // 初回にログインユーザー名でフィルタリングする
      // console.log('初回 かつ 営業職');
      const selectField = '担当名'; // フィルタリング対象のフィールド名
      const query = `${selectField} like "${selectNameL}" and ${selectField} like "${selectNameF}"`;
      // console.log('query = ', query);
      window.location.href = `${window.location.origin
                              + window.location.pathname}?view=${view}&query=${encodeURI(query)}`;
    } else if (flg1st === false) {
      // 初回ログインではない場合
      // console.log('初回ではない かつ 営業職:', affShop, ' ', selectName);
      document.getElementById(ShopIDname).value = affShop;
      document.getElementById(EmpIDname).value = selectName;
    }
  }

  /**
   * プルダウン店舗名と担当名のメンバを取得(作成)する
   */
  async function getLists() {
    // パラメータ設定 - fetchAllRecordsを使用して、店舗リストから店舗の一覧を配列で取得
    // 店舗名のプルダウンから除外する項目を配列に格納する
    let ExclusionShop = ['すてくら', 'なし', '本部', 'システム管理部', '本社', '買取店'];
    const paramsShop = {
      appId: 19,
      fields: ['店舗名'],
      filterCond: ExclusionShop.map((item) => '店舗名 not like '.concat('"', item, '"')).join(' and '),
    };

    // パラメータ設定 - fetchAllRecordsを使用して、社員名簿から社員一覧の配列を取得する
    ExclusionShop = ExclusionShop.map((item) => 'ルックアップ＿店舗名 not like '.concat('"', item, '"')).join(' and ');
    const paramsEmp = {
      appId: 34,
      fields: ['文字列＿氏名', '役職', 'ルックアップ＿店舗名', '状態'],
      filterCond: `状態 not in ("無効") and 役職 in ("営業","主任","店長") and ${ExclusionShop}`,
    };

    app86ShopListD = (await fetchAllRecords(paramsShop)); // 店舗リストから店舗の一覧を取得する
    app86EmployeesD = (await fetchAllRecords(paramsEmp)); // 社員名簿から社員の一覧を取得する

    // - 取得した店舗リストを、ローカルストレージに格納する
    // console.log('app86ShopListD ：', app86ShopListD);
    app86ShopListD = app86ShopListD.records.map((item) => item.店舗名.value);
    const newShopList = JSON.stringify(app86ShopListD);
    localStorage.setItem(app86ShopListKey, newShopList);

    // - 取得した社員リストを、ローカルストレージに格納する
    // console.log('app86EmployeesD ：', app86EmployeesD);
    app86EmployeesD = app86EmployeesD.records.map(({ 文字列＿氏名, ルックアップ＿店舗名 }) => (
      { name: 文字列＿氏名.value, shop: ルックアップ＿店舗名.value }));

    const newEmpList = JSON.stringify(app86EmployeesD);
    localStorage.setItem(app86EmployeesKey, newEmpList);

    // - 現在の日時を、LocalStrageに格納する
    app86DateTimeD = JSON.stringify(Date.now() / 1000);
    localStorage.setItem(app86DateTimeKey, app86DateTimeD);

    // 絞り込み表示対象者の所属店舗を設定する
    setAffiliationShop(app86EmployeesD); // 担当名(selectName)と、所属店舗(affShop)の更新
    console.log('APIリクエスト時の処理：初回判定 = ', flg1st, ', 営業職判定 = ', FlgOcpChk);
    console.log('店舗名', affShop, 'ユーザー名 = ', selectName);

    // プルダウンに選択肢を追加する

    makeList(app86ShopListD, ShopIDname); // 店舗名
    makeEmpList(app86EmployeesD, EmpIDname, affShop); // 担当名

    // 一覧の表示状態と、職種により、表示内容を切り替える
    setview();
  }

  /* **************************************** 処理実装部 **************************************** */
  // ボタンの増殖防止
  if (document.getElementById(EmpIDname) !== null) {
    return;
  }

  // 指定の一覧以外このJSを実行しない
  if (event.viewType === 'list') {
    view = event.viewId; // 現在の一覧IDを格納
  } else {
    /* if (event.viewId === viewall) {
      getHeaderSpaceElement().innerText = `上の"(すべて)"をクリックすると、一覧の表示方法が変更されます。
          絞り込み表示をしたい場合には、漏斗(ろうと)のアイコンをクリックし、条件を設定してください。
          詳細は、QA「絞り込み表示、ソートの仕方」を参照してください。`;
    } */
    return;
  }

  // プルダウンメニューの要素を設定する
  $(getHeaderMenuSpaceElement()).append(
    ` <div class='ListBoxGroup'>
        <div class='ShopListBox'>
          <label id='my_textShop'>店舗名: &nbsp;</label>
          <select id='my_selectShop'></select>
        </div>
        <div class='ViewAdjustment'>
          ${isMobile() ? '<br>' : '&nbsp;'}
        </div>
        <div class='EmpListBox'>
          <label id='my_textEmp'>担当名: &nbsp;</label>
          <select id='my_selectEmp'></select>
        </div>
      </div>`,
  );

  // 補助メッセージを表示する
  getHeaderSpaceElement().append('※[担当名]には[店長][主任][営業]の方を表示しています\n');

  // 担当名に表示する氏名の取り出しをする
  url = decodeURI(url); // urlをデコーディングする
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

  // LocalStrageに日時が保存されているか確認する - (1)
  app86DateTimeD = JSON.parse(localStorage.getItem(app86DateTimeKey));
  app86EmployeesD = JSON.parse(localStorage.getItem(app86EmployeesKey));
  app86ShopListD = JSON.parse(localStorage.getItem(app86ShopListKey));
  const now = (Date.now()) / 1000;
  console.log('1-1 経過時間(秒)：', (now - app86DateTimeD));

  // (1-2)データが保存されていない場合 or 前回のデータの取得から3時間経過している場合
  if ((app86DateTimeD === null) || (app86EmployeesD === null)
   || (app86ShopListD === null) || ((now - app86DateTimeD) >= divTime)) {
    app86DateTimeD = JSON.stringify(now);
    localStorage.setItem(app86DateTimeKey, app86DateTimeD);

    // ローカルストレージを一旦消去する
    localStorage.removeItem(app86DateTimeKey);
    localStorage.removeItem(app86EmployeesKey);
    localStorage.removeItem(app86ShopListKey);

    // 社員名簿アプリ及び、店舗リストアプリから一覧情報を取得する
    getLists();
  } else {
    // (1-1)(3-2)ローカルストレージにデータが保存されている場合 かつ、(2-2)3時間経過していない場合
    // - - - LocalStrageに保存されている店舗リスト(app86ShopListD)・社員リスト(app86EmployeesD)で処理する
    setAffiliationShop(app86EmployeesD); // 担当名(selectName)と、所属店舗(affShop)の更新

    // プルダウンの値を設定する
    makeList(app86ShopListD, ShopIDname); // 店舗名
    makeEmpList(app86EmployeesD, EmpIDname, affShop); // 担当名
    console.log('ローカルストレージからの処理：初回判定 = ', flg1st, ', 営業職判定 = ', FlgOcpChk);
    console.log('店舗名', affShop, 'ユーザー名 = ', selectName);

    // 一覧の表示状態と、職種により、表示内容を切り替える
    setview();
  }

  // プルダウン変更時の処理
  const myselectShop = document.getElementById('my_selectShop');
  const myselectEmp = document.getElementById('my_selectEmp');

  // 店舗名のプルダウン変更時の処理
  myselectShop.onchange = () => {
    affShop = document.getElementById(ShopIDname).value;
    // console.log('店舗名のプルダウンに変更あり 所属店舗= ', affShop);
    if (affShop === 'listall') {
      // '全てのレコードを表示'の時の処理
      window.location.href = `${window.location.origin
                              + window.location.pathname}?view=${viewall}`;
    } else if (affShop === 'init') {
      // 【選択してください】の時は何もしない
    } else {
      $(`#${EmpIDname} > option`).remove(); // プルダウン子要素の初期化
      makeEmpList(app86EmployeesD, EmpIDname, affShop); // 社員名のリスト(プルダウン)の更新

      if (flg1st === false || FlgOcpChk === false) {
        selectName = 'init'; // 店舗が変更されたときは、担当名も初期表示に戻す
      }
      document.getElementById(EmpIDname).value = selectName; // 担当名を設定
    }
  };

  // 担当者のプルダウン変更時の処理
  myselectEmp.onchange = () => {
    // console.log('担当名のプルダウンに変更あり');
    if (document.getElementById(EmpIDname).value === 'listall') {
      // 該当店舗の全てのレコードを表示
      const selectField = '店舗名'; // フィルタリング対象のフィールド名
      let shop = document.getElementById(ShopIDname).value;
      if (shop.indexOf('店') !== -1) {
        shop = shop.substring(0, shop.indexOf('店'));
        // console.log('店舗名', shop);
      }
      const query = `${selectField} like "${shop}"`;
      window.location.href = `${window.location.origin
                          + window.location.pathname}?view=${view}&query=${encodeURI(query)}`;
    } else if (document.getElementById(EmpIDname).value === 'init') {
      // デフォルト値・何もしない
    } else {
      const selectField = '担当名'; // フィルタリング対象のフィールド名
      const member = document.getElementById(EmpIDname).value;
      const Firstname = member.slice(member.indexOf(' ') + 1);
      const Lastname = member.substring(0, member.indexOf(' '));
      const query = `${selectField} like "${Lastname}" and ${selectField} like "${Firstname}"`;
      window.location.href = `${window.location.origin
                           + window.location.pathname}?view=${view}&query=${encodeURI(query)}`;
    }
  };
};

export default recordindexshow;