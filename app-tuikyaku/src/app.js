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
    const appId = kintone.app.getId(); // アプリID
    // const field = '文字列＿氏名'; // 上記アプリの必要なドロップダウンのフィールドコード

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

    // 初期値を追加（必要なければ消す）
    const ini = document.createElement('option');
    ini.value = userName;
    ini.innerText = userName;
    console.log('ユーザ名の取得 :', userName);
    document.getElementById('my_select_button').appendChild(ini);

    // プルダウンメニューの要素を設定する- ID:34 = 社員名簿
    const APP_ID = 34;
    const params = {
      app: APP_ID,
    };
    // kintone REST API リクエストを送信する
    kintone.api(kintone.api.url('/k/v1/records', true), 'GET', params, (res) => {
      console.log(res);
      const { options } = res.properties['文字列＿氏名'].value;
      console.log(options);
      // 設定項目の数だけ選択肢として追加
      Object.keys(options).forEach((op) => {
        const o = document.createElement('option');
        o.value = options[op].label;
        o.innerText = options[op].label;
        document.getElementById('my_select_button').appendChild(o);
      });
    }, (er) => {
      // エラーの場合はコンソールに出力
      console.log(er);
    });
  });
})();
