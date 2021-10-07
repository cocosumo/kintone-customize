import getRecords from '../handlers/getrecords'; // 注)kintone apiを使用しているため、promise
import { getHeaderMenuSpaceElement, getHeaderSpaceElement } from '../../../kintone-api/api';
// import getEmployees from '../Backend/getEmployees';
import setInitSelect from '../Backend/setSelectInit';

// [レコード一覧画面]プルダウンによる絞り込みを行う
const recordindexshow = (event) => {
  const TESTMODE = true; // テストモードと本番環境をコンパイルSWで切り替える[true:テスト用, false:本番環境用]
  let view; // 現在の一覧ID
  let viewpursuit = 5522965; // メインの一覧ID:[本番用= 5522965 ][テスト用= 5522965] =共通
  let viewcontract = 5523924; // 契約済の一覧ID:[本番用=5523924][テスト用=5523930]
  let viewcancel = 5523926; // 中止の一覧ID:[本番用=5523926][テスト用=5523932]
  let viewwebbrows = 5522969; // WEB閲覧の一覧ID:[本番用=5522969][テスト用=5522969]
  if (TESTMODE === true) {
    viewpursuit = 5522965; // メインの一覧ID:[テスト用= 5522965]
    viewcontract = 5523930; // 契約済の一覧ID:[テスト用=5523930]
    viewcancel = 5523932; // 中止の一覧ID:[テスト用=5523932]
    viewwebbrows = 5522969; // WEB閲覧の一覧ID:[テスト用=5522969] =共通
  }
  const viewall = 20; // (すべて)の一覧ID：本番用・テスト用共通 = 20
  const EmpIDname = 'my_select_buttonEmp';
  const ShopIDname = 'my_select_buttonShop';

  // ブランチのテスト

  // 指定の一覧以外このJSを実行しない
  if (event.viewId === viewpursuit
    || event.viewId === viewcontract
    || event.viewId === viewcancel
    || event.viewId === viewwebbrows) {
    getHeaderSpaceElement().innerText = '[担当名]のプルダウンには、役職が「店長」「主任」「営業」の方を表示しています。\n';
    // + 'この条件以外で絞り込みたい場合は、上の"メイン"をクリックし、"(すべて)"を選択してください。';
    view = event.viewId; // 現在の一覧IDを格納
  } else {
    if (event.viewId === viewall) {
      const infomation = ' 上の"(すべて)"をクリックすると、一覧の表示方法が変更されます。\n'
                       + ' 絞り込み表示をしたい場合には、漏斗(ろうと)のアイコンをクリックし、条件を設定してください。\n'
                       + ' 詳細は、QA「絞り込み表示、ソートの仕方」を参照してください。\n';
      // const linkstring = 'QAのリンクはこちら';
      // getHeaderSpaceElement().innerText = infomation + linkstring.link('https://rdmuhwtt6gx7.cybozu.com/k/104/show#record=8&l.view=5523657&l.q&l.sort_0=f5523588&l.order_0=ASC&l.next=9&l.prev=7');
      getHeaderSpaceElement().innerText = infomation;
    }
    return;
  }

  // ボタンの増殖防止
  if (document.getElementById(EmpIDname) !== null) {
    return;
  }

  // プルダウンメニューの要素を設定する
  // [一覧表示画面]プルダウン(店舗名)の設置
  let myselectShop = document.createElement('text');
  myselectShop.id = 'my_textShop';
  myselectShop.innerText = '店舗名: ';
  getHeaderMenuSpaceElement().appendChild(myselectShop);

  myselectShop = document.createElement('select');
  myselectShop.id = ShopIDname;
  myselectShop.innerText = '店舗名セレクト';
  getHeaderMenuSpaceElement().appendChild(myselectShop);

  // [一覧表示画面]プルダウン(担当者名)の設置
  let myselectEmp = document.createElement('text');
  myselectEmp.id = 'my_textEmp';
  myselectEmp.innerText = '　担当名: ';
  getHeaderMenuSpaceElement().appendChild(myselectEmp);

  myselectEmp = document.createElement('select');
  myselectEmp.id = EmpIDname;
  myselectEmp.innerText = 'セレクトボタン';
  getHeaderMenuSpaceElement().appendChild(myselectEmp);

  console.log('一覧:ヘッダにボタン設置');

  // 担当者のプルダウンに初期値を追加
  let affShop = 'init'; // 店舗名の初期値を格納する変数
  let selectName; // 選択されている社員名(初期値はログインユーザー名)
  let selectNameL; // ログインユーザーの苗字
  let selectNameF; // ログインユーザーの名前
  // let Shoplists; // 店舗リスト
  // let Employees; // 社員リスト
  let flg1st = false; // 初回判定用フラグ true=初回, false=初回ではない
  let FlgOcpChk = false; // 対象社員が営業職がどうかをチェックするフラグ true:営業, false:営業以外
  let url = window.location.search;
  url = decodeURI(url); // urlをデコーディングする

  // ローカルストレージの活用をする
  const app86DateTimeKey = 'app86日時'; // ローカルストレージの日時の保存名(キー)
  let app86DateTimeD; // ローカルストレージの日時の保存データ
  const app86EmployeesKey = 'app86社員リスト'; // ローカルストレージの社員リストの保存名(キー)
  let app86EmployeesD; // ローカルストレージの社員リストの保存データ
  const app86ShopListKey = 'app86店舗リスト'; // ローカルストレージの店舗リストの保存名(キー)
  let app86ShopListD; // ローカルストレージの店舗リストの保存データ
  const divTime = 10; // 経過時間の判定に使用する閾値(初期=10800秒=3時間で設定)

  // 担当名に表示する氏名の取り出しをする
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
    // URLにプルダウンで指定したqueryが含まれる場合
    flg1st = false;
    let resultPos = url.indexOf('担当名');
    if (resultPos !== -1) { // URLに'担当名'が含まれるとき(プルダウンでの絞り込み表示時)
      // ここから：絞り込み条件の氏名を取り出し 「query=担当名 like "苗字" and 担当名 like "名前"」
      selectName = url.slice(resultPos + 10); // 10=読み飛ばす文字数/slice=urlから指定箇所以降を取り出し
      resultPos = selectName.indexOf('担当名');
      selectNameL = selectName.substring(0, resultPos - 6); // 1文字目から"resultPos - 2"文字目までを取り出し
      selectName = selectName.slice(resultPos + 10);
      selectNameF = selectName.substring(0, selectName.indexOf('"'));
      selectName = selectNameL.concat(' ', selectNameF);
      affShop = 'init';
    } else if (url.indexOf('店舗名') !== -1) {
      resultPos = url.indexOf('店舗名');
      affShop = url.slice(resultPos + 10); // 10=読み飛ばす文字数/slice=urlから指定箇所以降を取り出し
      affShop = `${affShop.substring(0, affShop.indexOf('"'))}店`;
      selectName = 'init';
    } else {
      // ユーザがプルダウン以外で絞り込み表示している場合
      // 処理は実行しない
    }
  }

  /**
   * 社員リストから、対象の役職のみを取り出す処理
   * @param {Array} lists : 社員リストapp86EmployeesD({name: 氏名, shop: 店舗})
   */
  function makeEmpList(lists) {
    setInitSelect(EmpIDname); // 「---」と「すべてを表示する」を追加
    lists.forEach((item) => {
      // 対象のメンバのみをプルダウンに追加
      // 【選択してください】と'すべて表示'の時には、社員リストには全員追加する
      if (['init', 'listall'].includes(affShop)
       || affShop === item.shop) {
        const listitems = document.createElement('option');
        listitems.value = item.name;
        listitems.innerText = item.name;
        document.getElementById(EmpIDname).appendChild(listitems);
      }
    });
  }

  /**
   * 社員名簿のリストから、所属店舗(affshop)の取り出しと、対象職種かどうかを判定する(FlgOcpChk)
   * @param {array} lists : 社員名簿のリスト[{ name: 氏名, shop: 店舗}]
   */
  function chkOccupation(lists) {
    // 絞り込み表示対象者の所属店舗を設定する
    lists.forEach((item) => {
      if (item.name === selectName) {
        affShop = item.shop;
        console.log('店舗名の初期値 =', affShop);
        FlgOcpChk = true;
      }
    });
  }

  /**
   * 店舗リストのプルダウンを作成する
   * @param {array} lists : 店舗リスト[ 店舗名 ,・・・]
   */
  function makeShopList(lists) {
    setInitSelect(ShopIDname); // [店舗名]のプルダウンに、「【選択してください】」と「すべてのレコードを表示」を追加
    lists.forEach((item) => {
      // 対象の店舗名のみ、店舗リストに登録する
      const listitems = document.createElement('option');
      listitems.value = item;
      listitems.innerText = item;
      document.getElementById(ShopIDname).appendChild(listitems);
    });
  }

  /**
   * 該当の社員名(selectName)の所属店舗をaffshopに格納する処理
   * @param {array} lists : 社員名簿のリスト[{ name: 氏名, shop: 店舗}]
   */
  function setAffiliationShop(lists) {
    if (selectName !== 'init' && affShop === 'init') {
      lists.forEach((item) => {
        if (selectName === item.name) {
          affShop = item.shop;
        }
      });
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
      console.log('営業職ではない');
      if (affShop !== 'init') {
        document.getElementById(ShopIDname).value = affShop;
        document.getElementById(EmpIDname).value = 'listall';
      } else {
        document.getElementById(ShopIDname).value = 'init';
        document.getElementById(EmpIDname).value = 'init';
      }
    } else if (flg1st === true) {
      // 初回にログインユーザー名でフィルタリングする
      console.log('初回ではない　かつ　   営業職');
      const selectField = '担当名'; // フィルタリング対象のフィールド名
      const query = `${selectField} like "${selectNameL}" and ${selectField} like "${selectNameF}"`;
      console.log('query = ', query);
      window.location.href = `${window.location.origin + window.location.pathname}?view=${view}&query=${encodeURI(query)}`;
    } else if (flg1st === false) {
      // 初回ログインではない場合
      console.log('初回ではない　かつ　営業職:', affShop, ' ', selectName);
      document.getElementById(ShopIDname).value = affShop;
      document.getElementById(EmpIDname).value = selectName;
    }
  }

  // LocalStrageに日時が保存されているか確認する - (1)
  app86DateTimeD = JSON.parse(localStorage.getItem(app86DateTimeKey));
  app86EmployeesD = JSON.parse(localStorage.getItem(app86EmployeesKey));
  app86ShopListD = JSON.parse(localStorage.getItem(app86ShopListKey));
  console.log('レコード一覧の取得時間(Date.now(秒))：', app86DateTimeD);
  const now = (Date.now()) / 1000;
  console.log('1-1 現在の時間(Date.now(秒))：', now);
  console.log('1-1 経過時間(秒)：', (now - app86DateTimeD));

  // パラメータ設定 - getrecordsを使用して、店舗リストから店舗の一覧を配列で取得
  const APPSHOP_ID = 19; // ID:19 = 店舗リスト
  const FieldShop = '店舗名';
  const shopquery = '店舗名 not like "なし" and 店舗名 not like "本部"'
                    + 'and 店舗名 not like "システム管理部" and 店舗名 not like "本社"'
                    + 'and 店舗名 not like "買取店" and 店舗名 not like "すてくら"';
  const paramsShop = {
    app: APPSHOP_ID,
    fields: [FieldShop],
    filterCond: shopquery,
  };

  // パラメータ設定 - getrecordsを使用して、社員名簿から社員一覧の配列を取得する
  const APPEMP_ID = 34; // ID:34 = 社員名簿
  const FieldEmp = '文字列＿氏名';
  const FieldEmp2 = '役職';
  const FieldEmp3 = 'ルックアップ＿店舗名';
  const FieldEmp4 = '状態';
  const empquery = '状態 not in ("無効") and 役職 in ("営業","主任","店長") '
                  + 'and ルックアップ＿店舗名 not like "すてくら"'
                  + 'and ルックアップ＿店舗名 not like "なし"'
                  + 'and ルックアップ＿店舗名 not like "本部"'
                  + 'and ルックアップ＿店舗名 not like "システム管理部"'
                  + 'and ルックアップ＿店舗名 not like "本社"'
                  + 'and ルックアップ＿店舗名 not like "買取店"';
  const paramsEmp = {
    app: APPEMP_ID,
    fields: [FieldEmp, FieldEmp2, FieldEmp3, FieldEmp4],
    filterCond: empquery,
  };

  /**
   * プルダウン店舗名と担当名のメンバを取得(作成)する
   */
  async function getLists() {
    app86ShopListD = (await getRecords(paramsShop)); // 店舗リストから店舗の一覧を取得する
    app86EmployeesD = (await getRecords(paramsEmp)); // 社員名簿から社員の一覧を取得する

    // - 取得した店舗リストを、LocalStorageに格納する
    // console.log('app86ShopListD ：', app86ShopListD);
    app86ShopListD = app86ShopListD.records.map((item) => item.店舗名.value);
    const newShopList = JSON.stringify(app86ShopListD);
    localStorage.setItem(app86ShopListKey, newShopList);

    // - 取得した社員リストを、LocalStorageに格納する
    // console.log('app86EmployeesD ：', app86EmployeesD);
    app86EmployeesD = app86EmployeesD.records.map((item) => {
      const member = { name: item.文字列＿氏名.value, shop: item.ルックアップ＿店舗名.value };
      return member;
    });
    const newEmpList = JSON.stringify(app86EmployeesD);
    localStorage.setItem(app86EmployeesKey, newEmpList);

    // - 現在の日時を、LocalStrageに格納する
    app86DateTimeD = JSON.stringify(Date.now() / 1000);
    localStorage.setItem(app86DateTimeKey, app86DateTimeD);

    // 絞り込み表示対象者の所属店舗を設定する
    chkOccupation(app86EmployeesD); // affshop,FlgOcpChkの更新
    console.log('APIリクエスト時の処理：初回判定 = ', flg1st, ', 営業職判定 = ', FlgOcpChk);
    console.log('店舗名', affShop, 'ユーザー名 = ', selectName);

    // プルダウンに選択肢を追加する
    setAffiliationShop(app86EmployeesD); // 担当名(selectName)と、所属店舗(affshop)の更新
    makeShopList(app86ShopListD); // 店舗名
    makeEmpList(app86EmployeesD); // 担当名

    // 一覧の表示状態と、職種により、表示内容を切り替える
    setview();
  }

  // (1-2)データが保存されていない場合 or 前回のデータの取得から3時間経過している場合
  if ((app86DateTimeD === null) || (app86EmployeesD === null)
   || (app86ShopListD === null) || ((now - app86DateTimeD) >= divTime)) {
    app86DateTimeD = JSON.stringify(now);
    localStorage.setItem(app86DateTimeKey, app86DateTimeD);
    console.log('1-2 現在の時間(Date.now(秒))：', app86DateTimeD);

    getLists();
  } else {
    // (1-1)(3-2)LocalStorageにデータが保存されている場合 かつ、(2-2)3時間経過していない場合
    // - - - LocalStrageに保存されている店舗リスト・社員リストを取得する
    // 条件判定時にデータは取得済み
    // console.log('店舗リスト ', app86ShopListD);
    // console.log('社員リスト', app86EmployeesD);

    // プルダウンの値を設定する
    // console.log('【chkpoint】店舗名', affShop, 'ユーザー名 = ', selectName);
    setAffiliationShop(app86EmployeesD); // 担当名(selectName)と、所属店舗(affshop)の更新
    makeShopList(app86ShopListD); // 店舗名
    makeEmpList(app86EmployeesD); // 担当名
    chkOccupation(app86EmployeesD); // affshop,FlgOcpChkの更新
    console.log('LocalStorageからの処理：初回判定 = ', flg1st, ', 営業職判定 = ', FlgOcpChk);
    console.log('店舗名', affShop, 'ユーザー名 = ', selectName);

    // 一覧の表示状態と、職種により、表示内容を切り替える
    setview();
  }

  // 店舗名のプルダウン変更時の処理
  myselectShop.onchange = () => {
    affShop = document.getElementById(ShopIDname).value;
    console.log('店舗名のプルダウンに変更あり 所属店舗= ', affShop);
    if (affShop === 'listall') {
      // '全てのレコードを表示'の時の処理
      window.location.href = `${window.location.origin + window.location.pathname}?view=${viewall}`;
    } else if (affShop === 'init') {
      // 【選択してください】の時は何もしない
    } else {
      // プルダウン子要素の初期化
      if (myselectEmp.hasChildNodes()) {
        while (myselectEmp.childNodes.length > 0) {
          myselectEmp.removeChild(myselectEmp.firstChild);
        }
      }
      makeEmpList(app86EmployeesD); // 社員名のリスト(プルダウン)の更新

      if (flg1st === false || FlgOcpChk === false) {
        selectName = 'init';
      }
      document.getElementById(EmpIDname).value = selectName; // 担当名を設定
      console.log('担当名のプルダウンに、社員名を設定。設定値= ', selectName);
    }
  };

  // 担当者のプルダウン変更時の処理
  myselectEmp.onchange = () => {
    console.log('担当名のプルダウンに変更あり');
    if (document.getElementById(EmpIDname).value === 'listall') {
      // 該当店舗の全てのレコードを表示
      const selectField = '店舗名'; // フィルタリング対象のフィールド名
      let shop = document.getElementById(ShopIDname).value;
      if (shop.indexOf('店') !== -1) {
        shop = shop.substring(0, shop.indexOf('店'));
        console.log('店舗名', shop);
      }
      const query = `${selectField} like "${shop}"`;
      window.location.href = `${window.location.origin + window.location.pathname}?view=${view}&query=${encodeURI(query)}`;
    } else if (document.getElementById(EmpIDname).value === 'init') {
      // デフォルト値・何もしない
    } else {
      const selectField = '担当名'; // フィルタリング対象のフィールド名
      const member = document.getElementById(EmpIDname).value;
      // console.log('selectName ', selectName); // ->undefined
      // console.log('member ', member);
      // if (selectName === member) {
      const Firstname = member.slice(member.indexOf(' ') + 1);
      const Lastname = member.substring(0, member.indexOf(' '));
      const query = `${selectField} like "${Lastname}" and ${selectField} like "${Firstname}"`;
      window.location.href = `${window.location.origin + window.location.pathname}?view=${view}&query=${encodeURI(query)}`;
      // }
    }
  };
};

export default recordindexshow;
