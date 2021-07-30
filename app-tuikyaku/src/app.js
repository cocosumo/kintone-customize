import getRecords from './func/getrecords';

(() => {
  kintone.events.on('app.record.edit.show', (event) => {
    // [レコード編集画面]対象のレコードの編集を無効にする
    const { record } = event;

    record['顧客番号'].disabled = true;
    record['顧客名'].disabled = true;

    console.log('編集:一部フィールドの無効化');
    return event;
  });
  kintone.events.on('app.record.index.show', (event) => {
    const view = 5522965; // 一覧のID
    // const appId = kintone.app.getId(); // アプリID
    const field = '文字列＿氏名'; // 上記アプリの必要なドロップダウンのフィールドコード

    // 指定の一覧以外このJSを実行しない
    if (event.viewId !== view) {
      return;
    }

    // ボタンの増殖防止
    if (document.getElementById('my_select_button') !== null) {
      return;
    }

    // [一覧表示画面]プルダウンの設置
    const myselect = document.createElement('select');
    myselect.id = 'my_select_button';
    myselect.innerText = 'セレクトボタン';
    const myHeaderSpace = kintone.app.getHeaderMenuSpaceElement();
    myHeaderSpace.innerText = '担当名: ';
    kintone.app.getHeaderMenuSpaceElement().appendChild(myselect);
    console.log('一覧:ヘッダにボタン設置');

    // ログインユーザー情報の取得
    const userName = kintone.getLoginUser().name;

    // 初期値を追加
    const ini = document.createElement('option');
    ini.value = userName;
    ini.innerText = userName;
    console.log('ユーザ名の取得 :', userName);
    document.getElementById('my_select_button').appendChild(ini);

    // プルダウンメニューの要素を設定する- ID:34 = 社員名簿
    // 社員名簿のレコードを取得する
    const APP_ID = 34;
    const params = {
      app: APP_ID,
      // filterCond: '確度 in ("A") and 見込み時期 >= THIS_YEAR()',
      // sortConds: ['小計 desc', '会社名 asc'],
      fields: [field],
    };

    // kintone REST API リクエストを送信する
    kintone.api(kintone.api.url('/k/v1/records.json', true), 'GET', params, (resp) => {
      // success
      console.log('respのログ', resp);
      const Employees = resp.records;

      // 設定項目の数だけ選択肢として追加
      Employees.forEach((Employee) => {
        console.log(Employee.文字列＿氏名.value);
        const listitems = document.createElement('option');
        listitems.value = Employee.文字列＿氏名.value;
        listitems.innerText = Employee.文字列＿氏名.value;
        document.getElementById('my_select_button').appendChild(listitems);
        console.log(listitems);
      });
    }, (er) => {
      // error
      console.log(er);
    });

    // ドロップダウン変更時の処理
    myselect.onchange = () => {
      const member = document.getElementById('my_select_button').value;
      const query = `${field} in ("${member}")`;
      console.log(query);
      // location.href = location.origin + location.pathname +
      //  `?view=${view}&query=` + encodeURI(query);
    };

    // getRecords(params).then((resp) => {
    //   console.log(resp);
    // });
  });
})();
