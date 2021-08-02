(function () {
  const events = [
    'app.record.edit.submit',
    'app.record.create.submit.success',
    'mobile.app.record.edit.submit',
    'mobile.app.record.create.submit.success',
  ];
  kintone.events.on(events, (event) => {
    console.log(event.type);
    const subdomain = 'rdmuhwtt6gx7';
    const cw_token = '7bc795ef967064f642aa70956cde3cad';
    // const room_id = '225800073'; //test
    // const room_id = '213232379'; //RPA
    const room_id = '6732051'; // 本番

    // 初期設定ここまで
    const { record } = event;

    sendMessageToChatWork(setMessage());

    /* Functions */
    function setMessage() {
      let body = '';

      body += '付帯収益バトル報告です。';
      body += `\n\n 日付：${record['契約日'].value}`;
      body += `\n 種類：${record['種類'].value}`;
      body += `\n 金額：${numberWithCommas(record['契約金額'].value)}円`;
      body += `\n 担当：${getTableDetails()}`;
      body += `\n\n ${resolveEvent()}詳細は下記URLを参照してください。`;
      body += `\n https://${subdomain}.cybozu.com/k/${event.appId}/show#record=${event.recordId}`;
      return body;
    }

    function resolveEvent() {
      const eventType = event.type;
      if (eventType.includes('create')) {
        return '新着です。';
      } if (eventType.includes('edit')) {
        return '編集したレコードです。';
      }
    }

    function getTableDetails() {
      const table = record['担当者'].value;
      const tableContents = table.map((item) => {
        console.log(item);
        return `${item.value['担当者名'].value} (${item.value['ポイント'].value} pts)`;
      });
      return tableContents.join(' と ');
    }

    function sendMessageToChatWork(body) {
      const self_unread = 1;

      const url = `https://api.chatwork.com/v2/rooms/${room_id}/messages`;
      const headers = {
        'X-ChatWorkToken': cw_token,
        'Content-Type': 'application/x-www-form-urlencoded',
      };
      const params = `body=${body}&self_unread=${self_unread}`;

      kintone.proxy(url, 'POST', headers, params).then((args) => {
        // success
        console.log(args[1], JSON.parse(args[0]), args[2]);
      }, (error) => {
        // error
        console.log(error); // proxy APIのレスポンスボディ(文字列)を表示
      });
    }

    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  });
}());
