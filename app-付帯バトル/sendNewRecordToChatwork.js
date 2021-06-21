(function () {
    "use strict";
    kintone.events.on("app.record.create.submit.success", function (event) {

        //初期設定ここから

        // kintone サブドメイン （xxxxx.cybozu.com の xxxxxの部分）
        var subdomain = "rdmuhwtt6gx7";
        // chatwork APIトークン（チャットワークのAPI設定で取得）
        var cw_token = '7bc795ef967064f642aa70956cde3cad';
        // chatworkルームID（チャットワークURLの最後の数字部分 https://www.chatwork.com/#!rid99999999 なら 99999999）
        //var room_id = '225800073'; //test
        //var room_id = '213232379'; //RPA
        var room_id = '6732051'; //本番
        // 送信したメッセージを自分から見て未読とするか
        // 未読としない:0 未読にする:1
        var self_unread = 1;

        //初期設定ここまで
        var record = event.record;
        var date = record["日付_1"]["value"];
        var type = record["ドロップダウン_1"]["value"];
        var amount = record["数値_1"]["value"];
        var table = record["テーブル_1"]["value"];
        //alert(Object.keys(table).length);
        //alert(JSON.stringify(record));
        //console.log(price);
        var body = "";
        var tbl_vals = "";
        // レコードのデータ取得

        for (var key in table) {
            if (table.hasOwnProperty(key)) {
                tbl_vals += table[key]["value"]["ルックアップ"]["value"] + " " + table[key]["value"]["数値_2"]["value"] + " -- ";
                //alert(key + " -> " + JSON.stringify(table[key]["value"]["ルックアップ"]["value"]));
            }
        }


        var user = kintone.getLoginUser();
        body += "付帯収益バトル報告です。";
        body += "\n\n 日付：" + date;
        body += "\n 種類：" + type;
        body += "\n 金額：" + amount + "円";
        body += "\n 担当: " + tbl_vals;
        body += "\n\n 詳細は下記URLを参照してください。"
        body += "\n https://" + subdomain + ".cybozu.com/k/" + event.appId + "/show#record=" + event.recordId;

        if (!body) return;

        var url = 'https://api.chatwork.com/v2/rooms/' + room_id + '/messages';
        var headers = {
            'X-ChatWorkToken': cw_token,
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        var params = 'body=' + body + "&self_unread=" + self_unread;

        kintone.proxy(url, 'POST', headers, params).then(function (args) {
            //success
            console.log(args[1], JSON.parse(args[0]), args[2]);

        }, function (error) {
            //error
            console.log(error);  //proxy APIのレスポンスボディ(文字列)を表示
        });
    });
})();