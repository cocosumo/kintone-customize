// スペースフィールドにボタン設置
const sp = kintone.app.record.getSpaceElement('spBtn');
const btn = document.createElement('button');
btn.textContent = 'ボタン';
sp.appendChild(btn);

// ボタンクリック
btn.addEventListener('click', async () => {
  const fileKey = await kintone.api(
    kintone.api.url('/k/v1/record.json', true),
    'GET',
    {
      app: kintone.app.getLookupTargetAppId('テンプレート'),
      id: event.record.テンプレート.value,
    }
  );
  const url =
    'https://rdmuhwtt6gx7.cybozu.com/k/v1/file.json?fileKey=' +
    fileKey.record.添付ファイル.value[0].fileKey;

  // ファイルダウンロード
  const req = new XMLHttpRequest();
  req.open('GET', url);
  req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

  // SheetJS の公式ドキュメントのBrowser download fileを参考に
  req.responseType = 'arraybuffer';
  req.onload = (e) => {
    const data = new Uint8Array(req.response);
    const workbook = XLSX.read(data, {type: 'array'});
    // Excelのセルを書き換える(
    workbook.Sheets[workbook.SheetNames[0]].A1 = {
      v: kintone.app.record.get().record.名前.value,
    };
    XLSX.writeFile(workbook, event.record.出力ファイル名.value);
  };

  req.send();
});

return event;