import getRecords from '../handlers/getrecords';

// [レコード一覧画面]プルダウンによる絞り込みを行う
const recoedindexshow = (event) => {
  const view = 5522965; // 一覧のID
  // 上記アプリの必要なドロップダウンのフィールドコード
  // [★★★]const field00 = 'ルックアップ＿店舗名';
  const field01 = '文字列＿氏名';

  // 指定の一覧以外このJSを実行しない
  if (event.viewId !== view) {
    return;
  }

  // ボタンの増殖防止
  if (document.getElementById('my_select_button') !== null) {
    return;
  }
  /* [★★★]
  // [一覧表示画面]プルダウン(店舗名)の設置
  const myselect00 = document.createElement('select');
  myselect00.id = 'my_select_button00';
  myselect00.innerText = 'セレクトボタン0';
  const myHeaderSpace00 = kintone.app.getHeaderMenuSpaceElement();
  myHeaderSpace00.innerText = '店舗名: ';
  kintone.app.getHeaderMenuSpaceElement().appendChild(myselect00);

  // プルダウンメニューの要素を設定する- ID:34 = 社員名簿
  // 社員名簿のレコードを取得する
  [★★★] */
  const APP_ID = 34;
  /* [★★★]
  const params00 = {
    app: APP_ID,
    fields: [field00],
  };
  [★★★] */

  // [一覧表示画面]プルダウン(担当者名)の設置
  const myselect01 = document.createElement('select');
  myselect01.id = 'my_select_button';
  myselect01.innerText = 'セレクトボタン';
  const myHeaderSpace01 = kintone.app.getHeaderMenuSpaceElement();
  myHeaderSpace01.innerText = '担当名: ';
  kintone.app.getHeaderMenuSpaceElement().appendChild(myselect01);
  console.log('一覧:ヘッダにボタン設置');

  // ログインユーザー情報の取得
  const userName = kintone.getLoginUser().name;

  // 初期値を追加
  const ini = document.createElement('option');
  const url = window.location.search;
  const result = url.indexOf('(');
  console.log('location.search = ', url);
  console.log('URL内の"("検索位置 =', result);
  if (result !== -1) { // URLに'query'が含まれるとき(プルダウンでの絞り込み表示時)
    // 絞り込み条件の氏名を取り出し
    let selectName = url.slice(result + 1); // 7='query in '
    selectName = decodeURI(selectName);
    const lastlen = selectName.length;
    selectName = selectName.substring(1, lastlen - 2);
    ini.value = selectName;
    ini.innerText = selectName;
    console.log('ユーザ名の取得 :', selectName);
  } else { // URLに'query'が含まれるないとき(初回)
    ini.value = userName;
    ini.innerText = userName;
    console.log('ユーザ名の取得 :', userName);
  }
  document.getElementById('my_select_button').appendChild(ini);

  // プルダウンメニューの要素を設定する- ID:34 = 社員名簿
  // 社員名簿のレコードを取得する
  // const APP_ID = 34;
  const params01 = {
    app: APP_ID,
    fields: [field01],
  };

  getRecords(params01).then((resp) => { // 100件以上のレコード読み込み(上限1万件)
    console.log(resp);
    const Employees = resp.records;

    // 設定項目の数だけ選択肢として追加
    Employees.forEach((Employee) => {
      // console.log(Employee.文字列＿氏名.value);
      const listitems = document.createElement('option');
      listitems.value = Employee.文字列＿氏名.value;
      listitems.innerText = Employee.文字列＿氏名.value;
      document.getElementById('my_select_button').appendChild(listitems);
      // console.log(listitems);
    });
  }, (er) => {
    // error
    console.log('レコード取得に失敗しました。', er);
  });

  // ドロップダウン変更時の処理
  const selectField = '担当名'; // フィルタリング対象のフィールド名
  myselect01.onchange = () => {
    const member = document.getElementById('my_select_button').value;
    const query = `${selectField} in ("${member}")`;
    console.log('query = ', query);
    // console.log('origin = ', window.location.origin);      // https://rdmuhwtt6gx7.cybozu.com
    // console.log('pathname = ', window.location.pathname);  // /k/86/
    window.location.href = `${window.location.origin + window.location.pathname}?view=${view}&query=${encodeURI(query)}`;
  };
};

export default recoedindexshow;
