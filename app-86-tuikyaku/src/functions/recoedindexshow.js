import getRecords from '../handlers/getrecords';
import { getHeaderMenuSpaceElement, getHeaderSpaceElement } from '../../../kintone-api/api';

// [レコード一覧画面]プルダウンによる絞り込みを行う
const recordindexshow = (event) => {
  const view = 5522965; // メインの一覧ID:[本番用= 5522965 ][テスト用= 5522965 ] =共通
  const viewall = 20; // (すべて)の一覧ID：本番用・テスト用共通 = 20
  const FieldEmp = '文字列＿氏名';
  const FieldEmp2 = '役職';
  const FieldEmp3 = 'ルックアップ＿店舗名';

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
  // const APPSHOP_ID = 19; // ID:19 = 店舗リスト

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
  let url = window.location.search;
  url = decodeURI(url); // urlをデコーディングする
  let resultPos = url.indexOf('担当名');
  if (resultPos !== -1) { // URLに'query'が含まれるとき(プルダウンでの絞り込み表示時)
    // ここから：絞り込み条件の氏名を取り出し 「query=担当名 like "苗字" and 担当名 like "名前"」
    let selectName = url.slice(resultPos + 10); // 10=読み飛ばす文字数/slice=urlから指定箇所以降を取り出し
    resultPos = selectName.indexOf('担当名');
    const selectNameL = selectName.substring(0, resultPos - 6); // 1文字目から"resultPos - 2"文字目までを取り出し
    selectName = selectName.slice(resultPos + 10);
    const selectNameF = selectName.substring(0, selectName.indexOf('"'));
    selectName = selectNameL.concat(' ', selectNameF);
    ini.value = selectName;
    ini.innerText = selectName;
    console.log('ユーザ名の取得 :', selectName);
    // ここまで：絞り込み条件の氏名を取り出し
  } else { // URLに'query'が含まれないとき(初回)
    let selectName = userName;
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
  document.getElementById('my_select_buttonEmp').appendChild(ini);

  // プルダウンに「全てのレコードを表示」を追加
  const newitem = document.createElement('option');
  newitem.value = 'listall';
  newitem.innerText = '全てのレコードを表示';
  document.getElementById('my_select_buttonEmp').appendChild(newitem);

  // プルダウンメニューの要素を設定する- ID:34 = 社員名簿 -> 社員名簿のレコードを取得する
  const paramsEmp = {
    app: APPEMP_ID,
    fields: [FieldEmp, FieldEmp2, FieldEmp3],
  };

  let affShop = ''; // 店舗名の初期値を格納する変数
  getRecords(paramsEmp).then((resp) => { // 100件以上のレコード読み込み(上限1万件)
    console.log('レコード取得に成功しました！', resp);
    const Employees = resp.records; // 社員

    // 設定項目の数だけ選択肢として追加
    Employees.forEach((Employee) => {
      console.log('Employee.文字列＿氏名.value =', Employee.文字列＿氏名.value);
      console.log('selectName =', selectName);
      if (Employee.文字列＿氏名.value === selectName) {
        affShop = Employee.ルックアップ＿店舗名.value;
      }
      // 対象の役職のメンバのみをプルダウンに追加
      if (Employee.役職.value === '営業'
       || Employee.役職.value === '主任'
       || Employee.役職.value === '店長') {
        const listitems = document.createElement('option');
        listitems.value = Employee.文字列＿氏名.value;
        listitems.innerText = Employee.文字列＿氏名.value;
        document.getElementById('my_select_buttonEmp').appendChild(listitems);
      }
    });
  }, (er) => {
    // error
    console.log('レコード取得に失敗しました。', er);
  });

  // 店舗名のプルダウンに初期値を追加
  const shopini = document.createElement('option');
  shopini.value = affShop;
  shopini.innerText = affShop;
  document.getElementById('my_select_buttonShop').appendChild(shopini);

  // [ログインユーザー情報から、所属店舗を抜き出す]
  // [プルダウンの初期値に追加する]

  // 店舗名のプルダウンに、店舗名のリストを追加する
  // [ユーザー管理の[組織]の情報から、店舗情報を抜き出す]
  // [店舗名の取り出し方法=ゆめてつ以下、"店"の含まれる組織を抽出し、組織名称から"ゆめてつ"を取り除く]
  // [プルダウンのリストに追加する]

  console.log('実行結果:', value); // => 実行結果:成功!

  // 担当者のドロップダウン変更時の処理
  const selectField = '担当名'; // フィルタリング対象のフィールド名
  myselectEmp.onchange = () => {
    if (document.getElementById('my_select_buttonEmp').value === 'listall') {
      // 全てのレコードを表示
      window.location.href = `${window.location.origin + window.location.pathname}?view=${viewall}`;
    } else {
      const member = document.getElementById('my_select_buttonEmp').value;
      const Firstname = member.slice(member.indexOf(' ') + 1);
      const Lastname = member.substring(0, member.indexOf(' '));
      const query = `${selectField} like "${Lastname}" and ${selectField} like "${Firstname}"`;
      window.location.href = `${window.location.origin + window.location.pathname}?view=${view}&query=${encodeURI(query)}`;
    }
  };
};

export default recordindexshow;
