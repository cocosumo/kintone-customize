import getRecords from '../handlers/getrecords';
import { getHeaderMenuSpaceElement } from '../../../kintone-api/api';

// [レコード一覧画面]プルダウンによる絞り込みを行う
const recoedindexshow = (event) => {
  const view = 5522965; // 一覧のID:[本番用= 5522965 ][テスト用= 5522965 ] =共通
  // 上記アプリの必要なドロップダウンのフィールドコード
  // [★★★]const field00 = 'ルックアップ＿店舗名';
  const field01 = '文字列＿氏名';

  // 指定の一覧以外このJSを実行しない
  if (event.viewId !== view) {
    return;
  }

  // ボタンの増殖防止
  if (document.getElementById('my_select_button01') !== null) {
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
  myselect01.id = 'my_select_button01';
  myselect01.innerText = 'セレクトボタン';

  // console.log('getHeadermenuSpaceElement =', getHeaderMenuSpaceElement);
  getHeaderMenuSpaceElement().innerText = '担当名: ';
  getHeaderMenuSpaceElement().appendChild(myselect01);
  console.log('一覧:ヘッダにボタン設置');

  // ログインユーザー情報の取得
  const userName = kintone.getLoginUser().name;

  // 初期値を追加
  const ini = document.createElement('option');
  let url = window.location.search;
  url = decodeURI(url); // urlをデコーディングする
  let resultPos = url.indexOf('担当名');
  console.log('location.search = ', url);
  console.log('URL内の"担当名"検索位置 =', resultPos);
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
  document.getElementById('my_select_button01').appendChild(ini);

  // プルダウンメニューの要素を設定する- ID:34 = 社員名簿
  // 社員名簿のレコードを取得する
  // const APP_ID = 34;
  const params01 = {
    app: APP_ID,
    fields: [field01],
  };

  getRecords(params01).then((resp) => { // 100件以上のレコード読み込み(上限1万件)
    console.log('レコード取得に成功しました！', resp);
    const Employees = resp.records; // 社員

    // 設定項目の数だけ選択肢として追加
    Employees.forEach((Employee) => {
      const listitems = document.createElement('option');
      listitems.value = Employee.文字列＿氏名.value;
      listitems.innerText = Employee.文字列＿氏名.value;
      document.getElementById('my_select_button01').appendChild(listitems);
    });
  }, (er) => {
    // error
    console.log('レコード取得に失敗しました。', er);
  });

  // ドロップダウン変更時の処理
  const selectField = '担当名'; // フィルタリング対象のフィールド名
  myselect01.onchange = () => {
    const member = document.getElementById('my_select_button01').value;
    const Firstname = member.slice(member.indexOf(' ') + 1);
    console.log('Firstname = ', Firstname);
    console.log('member = ', member);
    const Lastname = member.substring(0, member.indexOf(' '));
    console.log('Lastname = ', Lastname);
    // const query = `${selectField} in ("${member}")`;
    const query = `${selectField} like "${Lastname}" and ${selectField} like "${Firstname}"`;
    console.log('query = ', query);
    // console.log('origin = ', window.location.origin);      // https://rdmuhwtt6gx7.cybozu.com
    // console.log('pathname = ', window.location.pathname);  // /k/86/
    window.location.href = `${window.location.origin + window.location.pathname}?view=${view}&query=${encodeURI(query)}`;
  };
};

export default recoedindexshow;
