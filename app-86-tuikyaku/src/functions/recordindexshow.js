import getRecords from '../handlers/getrecords';
import { getHeaderMenuSpaceElement, getHeaderSpaceElement } from '../../../kintone-api/api';

// [レコード一覧画面]プルダウンによる絞り込みを行う
const recordindexshow = (event) => {
  const view = 5522965; // メインの一覧ID:[本番用= 5522965 ][テスト用= 5522965 ] =共通
  const viewall = 20; // (すべて)の一覧ID：本番用・テスト用共通 = 20
  const FieldEmp = '文字列＿氏名';
  const FieldEmp2 = '役職';
  const FieldEmp3 = 'ルックアップ＿店舗名';
  const FieldShop = '店舗名';

  // 指定の一覧以外このJSを実行しない
  if (event.viewId !== view) {
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
  if (document.getElementById('my_select_buttonEmp') !== null) {
    return;
  }

  // プルダウンメニューの要素を設定する
  const APPEMP_ID = 34; // ID:34 = 社員名簿
  const APPSHOP_ID = 19; // ID:19 = 店舗リスト

  // [一覧表示画面]プルダウン(店舗名)の設置
  let myselectShop = document.createElement('text');
  myselectShop.id = 'my_textShop';
  myselectShop.innerText = '店舗名: ';
  getHeaderMenuSpaceElement().appendChild(myselectShop);

  myselectShop = document.createElement('select');
  myselectShop.id = 'my_select_buttonShop';
  myselectShop.innerText = '店舗名セレクト';
  getHeaderMenuSpaceElement().appendChild(myselectShop);

  // [一覧表示画面]プルダウン(担当者名)の設置
  let myselectEmp = document.createElement('text');
  myselectEmp.id = 'my_textEmp';
  myselectEmp.innerText = '　担当名: ';
  getHeaderMenuSpaceElement().appendChild(myselectEmp);

  myselectEmp = document.createElement('select');
  myselectEmp.id = 'my_select_buttonEmp';
  myselectEmp.innerText = 'セレクトボタン';
  getHeaderMenuSpaceElement().appendChild(myselectEmp);

  console.log('一覧:ヘッダにボタン設置');

  // ログインユーザー情報の取得
  const userName = kintone.getLoginUser().name;

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

    const selectField = '担当名'; // フィルタリング対象のフィールド名
    const query = `${selectField} like "${selectNameL}" and ${selectField} like "${selectNameF}"`;
    console.log('query = ', query);
    window.location.href = `${window.location.origin + window.location.pathname}?view=${view}&query=${encodeURI(query)}`;
  }

  // サブ関数 ＊＊＊＊＊ ここから ＊＊＊＊＊
  // -------------------------------------------------------------------
  // 関数名 ：  setEmployeename()
  // 内容   ：  queryを含むURLから、担当者名や店舗名など、必要な情報を抜き出す処理
  // -------------------------------------------------------------------
  // 引数   ：  なし
  // -------------------------------------------------------------------
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
      ini.value = selectName;
      ini.innerText = selectName;
      // 店舗名の初期値を設定
      document.getElementById('my_select_buttonEmp').value = selectName;
      console.log('[担当名]ユーザ名の取得 :', document.getElementById('my_select_buttonEmp').value);
      // ここまで：絞り込み条件の氏名を取り出し
    } else { // if (url.indexOf('店舗名') !== -1)
      resultPos = url.indexOf('店舗名');
      selectName = url.slice(resultPos + 10); // 10=読み飛ばす文字数/slice=urlから指定箇所以降を取り出し
      selectName = selectName.substring(0, selectName.indexOf('"'));
      affShop = selectName;
      // 店舗名の初期値を設定
      document.getElementById('my_select_buttonShop').value = affShop;
      console.log('[店舗名]ユーザ名の取得 :', selectName);
    }
  }

  // -------------------------------------------------------------------
  // 関数名 ：  picupShopname(lists)
  // 内容   ：  選択中の社員が所属する、店舗名を取り出す処理
  // -------------------------------------------------------------------
  // 引数   ：  lists = 店舗リストの情報が含まれているobject
  // -------------------------------------------------------------------
  function picupShopname(lists) {
    lists.forEach((item) => {
      // 対象の役職のメンバのみをプルダウンに追加
      if (item.文字列＿氏名.value === selectName) {
        affShop = item.ルックアップ＿店舗名.value;
        console.log('店舗名の初期値 =', affShop);
        // 店舗名の初期値を設定
        document.getElementById('my_select_buttonShop').value = affShop;
      }
    });
  }

  // -------------------------------------------------------------------
  // 関数名 ：  AddEmplist(lists)
  // 内容   ：  該当の店舗に所属する社員の一覧を、プルダウンのリストへ追加する処理
  // -------------------------------------------------------------------
  // 引数   ：  lists = 社員名簿の情報が含まれているobject
  // -------------------------------------------------------------------
  function AddEmplist(lists) {
    lists.forEach((item) => {
      // 対象の役職のメンバのみをプルダウンに追加
      if (item.ルックアップ＿店舗名.value === myselectShop.value) {
        if (item.役職.value === '営業'
        || item.役職.value === '主任'
        || item.役職.value === '店長') {
          const listitems = document.createElement('option');
          listitems.value = item.文字列＿氏名.value;
          listitems.innerText = item.文字列＿氏名.value;
          document.getElementById('my_select_buttonEmp').appendChild(listitems);
        }
      }
    });
  }

  // -------------------------------------------------------------------
  // 関数名 ：  setEmpInitSelect()
  // 内容   ：  プルダウンに「---」と「全てのレコードを表示」を追加する処理
  // -------------------------------------------------------------------
  // 引数   ：  なし
  // -------------------------------------------------------------------
  function setEmpInitSelect() {
    const newitem = document.createElement('option');
    newitem.value = 'init';
    newitem.innerText = '---';
    document.getElementById('my_select_buttonEmp').appendChild(newitem);
    const newitem2 = document.createElement('option');
    newitem2.value = 'listall';
    newitem2.innerText = '全てのレコードを表示';
    document.getElementById('my_select_buttonEmp').appendChild(newitem2);
    console.log('セレクトボックスの初期値セット完了');
  }
  // -------------------------------------------------------------------
  // サブ関数 ＊＊＊＊＊ ここまで ＊＊＊＊＊
  // -------------------------------------------------------------------

  setEmployeename();
  setEmpInitSelect();

  // プルダウンメニューの要素を設定する- ID:34 = 社員名簿 -> 社員名簿のレコードを取得する
  const paramsEmp = {
    app: APPEMP_ID,
    fields: [FieldEmp, FieldEmp2, FieldEmp3],
  };

  let Employees; // 社員名簿の全レコード
  getRecords(paramsEmp).then((resp) => { // 100件以上のレコード読み込み(上限1万件)
    console.log('社員名簿のレコード取得に成功しました！', resp);
    Employees = resp.records; // 社員
    picupShopname(Employees);
    AddEmplist(Employees);
    setEmployeename();
  }, (er) => {
    // error
    console.log('社員名簿のレコード取得に失敗しました。', er);
  });

  // 店舗名のプルダウンに、店舗名のリストを追加する
  const paramsShop = {
    app: APPSHOP_ID,
    fields: [FieldShop],
  };

  getRecords(paramsShop).then((resp) => { // 100件以上のレコード読み込み(上限1万件)
    console.log('店舗リストのレコード取得に成功しました！', resp);
    const Shoplists = resp.records; // 社員

    // 設定項目の数だけ選択肢として追加
    Shoplists.forEach((ShopName) => {
      // 対象の店舗のみをプルダウンに追加
      if (ShopName.店舗名.value !== 'なし'
      && ShopName.店舗名.value !== '本部'
      && ShopName.店舗名.value !== 'システム管理部') {
        const listitems = document.createElement('option');
        listitems.value = ShopName.店舗名.value;
        listitems.innerText = ShopName.店舗名.value;
        document.getElementById('my_select_buttonShop').appendChild(listitems);
      }
    });
    setEmployeename();
  }, (er) => {
    // error
    console.log('店舗リストのレコード取得に失敗しました。', er);
  });

  // -------------------------------------------------------------------
  // 関数名 ：  myselectShop.onchange
  // 内容   ：  [店舗名]のプルダウン変更時の処理
  // -------------------------------------------------------------------
  // 引数   ：  なし
  // -------------------------------------------------------------------
  myselectShop.onchange = () => {
    affShop = document.getElementById('my_select_buttonShop').value;
    // プルダウン子要素の初期化
    if (myselectEmp.hasChildNodes()) {
      while (myselectEmp.childNodes.length > 0) {
        myselectEmp.removeChild(myselectEmp.firstChild);
      }
    }

    setEmpInitSelect(); // 「---」と「すべてを表示する」を追加
    AddEmplist(Employees); // 社員名のリスト(プルダウン)の更新
  };

  // -------------------------------------------------------------------
  // 関数名 ：  myselectShop.onchange
  // 内容   ：  [担当者名]のプルダウン変更時の処理
  // -------------------------------------------------------------------
  // 引数   ：  なし
  // -------------------------------------------------------------------
  myselectEmp.onchange = () => {
    if (document.getElementById('my_select_buttonEmp').value === 'listall') {
      // 全てのレコードを表示
      // window.location.href = `${window.location.origin + window.location.pathname}?view=${viewall}`;
      const selectField = '店舗名'; // フィルタリング対象のフィールド名
      const shop = document.getElementById('my_select_buttonShop').value;
      const query = `${selectField} like "${shop}"`;
      window.location.href = `${window.location.origin + window.location.pathname}?view=${view}&query=${encodeURI(query)}`;
    } else if (document.getElementById('my_select_buttonEmp').value === 'init') {
      const selectField = '店舗名'; // フィルタリング対象のフィールド名
      const shop = document.getElementById('my_select_buttonShop').value;
      const query = `${selectField} like "${shop}"`;
      window.location.href = `${window.location.origin + window.location.pathname}?view=${view}&query=${encodeURI(query)}`;
    } else {
      const selectField = '担当名'; // フィルタリング対象のフィールド名
      const member = document.getElementById('my_select_buttonEmp').value;
      const Firstname = member.slice(member.indexOf(' ') + 1);
      const Lastname = member.substring(0, member.indexOf(' '));
      const query = `${selectField} like "${Lastname}" and ${selectField} like "${Firstname}"`;
      window.location.href = `${window.location.origin + window.location.pathname}?view=${view}&query=${encodeURI(query)}`;
    }
  };
};

export default recordindexshow;
