import getRecords from '../handlers/getrecords';
// import getEmployees from '../Backend/getEmpRecord';
// import getShopRecords from '../Backend/getShopRecords';
import { getHeaderMenuSpaceElement, getHeaderSpaceElement } from '../../../kintone-api/api';

// [レコード一覧画面]プルダウンによる絞り込みを行う
const recordindexshow = (event) => {
  const view = 5522965; // メインの一覧ID:[本番用= 5522965 ][テスト用= 5522965 ] =共通
  const viewall = 20; // (すべて)の一覧ID：本番用・テスト用共通 = 20
  const EmpIDname = 'my_select_buttonEmp';
  const ShopIDname = 'my_select_buttonShop';

  // ブランチのテスト

  // 社員情報の取得
  // const Employees = getEmployees;
  const APPEMP_ID = 34; // ID:34 = 社員名簿
  const FieldEmp = '文字列＿氏名';
  const FieldEmp2 = '役職';
  const FieldEmp3 = 'ルックアップ＿店舗名';

  const paramsEmp = {
    app: APPEMP_ID,
    fields: [FieldEmp, FieldEmp2, FieldEmp3],
  };
  // プルダウンメニューの要素を設定する
  const APPSHOP_ID = 19; // ID:19 = 店舗リスト
  const FieldShop = '店舗名';

  // 店舗名のプルダウンに、店舗名のリストを追加する
  const paramsShop = {
    app: APPSHOP_ID,
    fields: [FieldShop],
  };

  // 指定の一覧以外このJSを実行しない
  if (event.viewId === view) {
    getHeaderSpaceElement().innerText = '[担当名]のプルダウンには、役職が「店長」「主任」「営業」の方を表示しています。\n'
                                      + 'この条件以外で絞り込みたい場合は、上の"メイン"をクリックし、"(すべて)"を選択してください。';
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

  // ログインユーザー情報の取得
  const userName = kintone.getLoginUser().name;
  // const userID = kintone.getLoginUser().employeeNumber;

  // 担当者のプルダウンに初期値を追加
  const ini = document.createElement('option');
  let affShop = ''; // 店舗名の初期値を格納する変数
  let selectName; // 選択されている社員名(初期値はログインユーザー名)
  let url = window.location.search;
  url = decodeURI(url); // urlをデコーディングする
  if ((url.indexOf('担当名') === -1) && (url.indexOf('店舗名') === -1)) { // URLに'query'が含まれないとき(初回)
    selectName = userName;
    const selectNameL = selectName.substring(0, selectName.indexOf(' '));
    const selectNameF = selectName.slice(selectName.indexOf(' ') + 1);
    selectName = selectNameL.concat(' ', selectNameF);
    ini.value = selectName;
    ini.innerText = selectName;
    console.log('ユーザ名の取得 :', selectName);

    // 役職が営業/主任/店長出ない場合は、初期値で絞り込まない
    /*
    let userpost; // ログインユーザーの役職を格納する
    const params = {
      app: APPEMP_ID,
      id: userID,
    };
    kintone.api(kintone.api.url('/k/v1/record.json', true), 'GET', params).then((resp) => {
      console.log('役職を表示したい ', resp);
      console.log('役職を表示 ', resp.record.役職.value);
      userpost = resp.record.役職.value;
    });
    */
    /*
    if (userpost === '営業'
      || userpost === '主任'
      || userpost === '店長') {
    */
    const selectField = '担当名'; // フィルタリング対象のフィールド名
    const query = `${selectField} like "${selectNameL}" and ${selectField} like "${selectNameF}"`;
    console.log('query = ', query);
    window.location.href = `${window.location.origin + window.location.pathname}?view=${view}&query=${encodeURI(query)}`;
    // }
  }

  /* サブ関数 ***** ここから ***** */
  /**
   * queryを含むURLから、担当者名や店舗名など、必要な情報を抜き出す処理
   */
  function setEmployeename() {
    let resultPos = url.indexOf('担当名');
    if (resultPos !== -1) { // URLに'query'が含まれるとき(プルダウンでの絞り込み表示時)
      // ここから：絞り込み条件の氏名を取り出す 「query=担当名 like "苗字" and 担当名 like "名前"」
      selectName = url.slice(resultPos + 10); // 10=読み飛ばす文字数/ slice = urlから指定箇所以降を取り出し
      resultPos = selectName.indexOf('担当名');
      const selectNameL = selectName.substring(0, resultPos - 6); // 1文字目から"resultPos - 2"文字目までを取り出し
      selectName = selectName.slice(resultPos + 10);
      const selectNameF = selectName.substring(0, selectName.indexOf('"'));
      selectName = selectNameL.concat(' ', selectNameF);

      // 店舗名の初期値を設定
      document.getElementById(EmpIDname).value = selectName;
      console.log('[担当名]ユーザ名の取得 :', selectName);
      // ログインユーザーがリスト化対象外職種の場合は、「---」を選択
      if (selectName !== document.getElementById(EmpIDname).value) {
        document.getElementById(EmpIDname).value = '---';
        selectName = '---';
      }
      // ここまで：絞り込み条件の氏名を取り出し
    } else { // if (url.indexOf('店舗名') !== -1)
      resultPos = url.indexOf('店舗名');
      affShop = url.slice(resultPos + 10); // 10=読み飛ばす文字数/slice=urlから指定箇所以降を取り出し
      affShop = affShop.substring(0, affShop.indexOf('"'));
      // 店舗名の初期値を設定
      document.getElementById(ShopIDname).value = affShop;
      // ログインユーザーがリスト化対象外店舗所属の場合は、「---」を選択
      if (affShop !== document.getElementById(ShopIDname).value) {
        document.getElementById(ShopIDname).value = '---';
        affShop = '---';
      }
      console.log('[店舗名]ユーザ名の取得 :', affShop);
    }
  }

  /**
   * 該当の店舗に所属する社員の一覧を、プルダウンのリストへ追加する処理
   * 対象の職種は「営業」「主任」「店長」のみとしています。
   * @type {Array} lists  社員名簿[文字列＿氏名]の情報が含まれているobject
   */
  function AddEmplist(lists) {
    lists.forEach((item) => {
      // 対象の役職のメンバのみをプルダウンに追加
      if (item.役職.value === '営業'
      || item.役職.value === '主任'
      || item.役職.value === '店長') {
        console.log('myselectShop.value =', myselectShop.value);
        if ((myselectShop.value === 'listall'
        || myselectShop.value === 'init')
        || (item.ルックアップ＿店舗名.value === myselectShop.value)) {
          const listitems = document.createElement('option');
          listitems.value = item.文字列＿氏名.value;
          listitems.innerText = item.文字列＿氏名.value;
          document.getElementById(EmpIDname).appendChild(listitems);
        }
      }
    });
  }

  /**
     * 選択中の社員が所属する、店舗名を取り出す処理
     * @type {Array} lists  店舗リスト[ルックアップ＿店舗名]の情報が含まれている配列
     */
  function pickupShopname(lists) {
    lists.forEach((item) => {
      // 対象の役職のメンバのみをプルダウンに追加
      if (item.文字列＿氏名.value === selectName) {
        affShop = item.ルックアップ＿店舗名.value;
        console.log('店舗名の初期値 =', affShop);
        // 店舗名の初期値を設定
        document.getElementById(ShopIDname).value = affShop;
        // ログインユーザーがリスト化対象外店舗所属の場合は、「---」を選択
        if (affShop !== document.getElementById(ShopIDname).value) {
          document.getElementById(ShopIDname).value = '---';
        }
      }
    });
  }

  let Employees; // 社員名簿の全レコード
  getRecords(paramsEmp).then((resp) => { // 100件以上のレコード読み込み(上限1万件)
    console.log('社員名簿のレコード取得に成功しました！', resp);
    Employees = resp.records; // 社員
    pickupShopname(Employees, ShopIDname);
    AddEmplist(Employees);
    setEmployeename();
    return resp;
  }, (er) => {
    // error
    console.log('社員名簿のレコード取得に失敗しました。', er);
  });

  /**
   * プルダウンに「---」と「全てのレコードを表示」を追加する処理
   * @type {string} targetID = 対象のプルダウンのID名
   */
  function setEmpInitSelect(targetID) {
    const newitem = document.createElement('option');
    newitem.value = 'init';
    newitem.innerText = '---';
    document.getElementById(targetID).appendChild(newitem);
    const newitem2 = document.createElement('option');
    newitem2.value = 'listall';
    newitem2.innerText = '全てのレコードを表示';
    document.getElementById(targetID).appendChild(newitem2);
    console.log('セレクトボックスの初期値セット完了');
  }

  // const Shoplists = getShopRecords;
  getRecords(paramsShop).then((resp) => { // 100件以上のレコード読み込み(上限1万件)
    setEmpInitSelect(ShopIDname); // [店舗名]のプルダウンに、「---」と「すべてのレコードを表示」を追加
    console.log('店舗リストのレコード取得に成功しました！', resp);
    const Shoplists = resp.records; // 社員

    // 設定項目の数だけ選択肢として追加
    Shoplists.forEach((ShopName) => {
      // 対象の店舗のみをプルダウンに追加(すてくらを含まない、「なし」「本部」「システム管理部」以外)
      if (ShopName.店舗名.value !== 'なし'
      && ShopName.店舗名.value !== '本部'
      && ShopName.店舗名.value !== 'システム管理部'
      && ShopName.店舗名.value !== '本社'
      && ShopName.店舗名.value !== '買取店'
      && ShopName.店舗名.value.indexOf('すてくら') === -1) {
        const listitems = document.createElement('option');
        listitems.value = ShopName.店舗名.value;
        listitems.innerText = ShopName.店舗名.value;
        document.getElementById(ShopIDname).appendChild(listitems);
      }
    });
    setEmployeename();
    return resp;
  }, (er) => {
    // error
    console.log('店舗リストのレコード取得に失敗しました。', er);
  });
  /* サブ関数 ***** ここまで ***** */

  // setEmployeename();
  setEmpInitSelect(EmpIDname);

  /**
   * [店舗名]のプルダウン変更時の処理
   */
  myselectShop.onchange = () => {
    affShop = document.getElementById(ShopIDname).value;
    // プルダウン子要素の初期化
    if (document.getElementById(ShopIDname).value === 'listall') {
      // 全てのレコードを表示
      window.location.href = `${window.location.origin + window.location.pathname}?view=${viewall}`;
    } else if (myselectEmp.hasChildNodes()) {
      while (myselectEmp.childNodes.length > 0) {
        myselectEmp.removeChild(myselectEmp.firstChild);
      }
    }

    setEmpInitSelect(EmpIDname); // [担当者]のプルダウンに「---」と「すべてを表示する」を追加
    AddEmplist(Employees); // 担当者のリスト(プルダウン)を更新する
  };

  /**
   * [担当者名]のプルダウン変更時の処理
   */
  myselectEmp.onchange = () => {
    if (document.getElementById(EmpIDname).value === 'listall') {
      const selectField = '店舗名'; // フィルタリング対象のフィールド名
      const shop = document.getElementById(ShopIDname).value;
      const query = `${selectField} like "${shop}"`;
      window.location.href = `${window.location.origin + window.location.pathname}?view=${view}&query=${encodeURI(query)}`;
    } else if (document.getElementById(EmpIDname).value === 'init') {
      // デフォルト値・何もしない
    } else {
      console.log('selectName ', selectName);
      const selectField = '担当名'; // フィルタリング対象のフィールド名
      const member = document.getElementById(EmpIDname).value;
      console.log('member ', member);
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
