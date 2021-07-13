(() => {
  kintone.events.on('app.record.edit.show', (event) => {
    // 対象のレコードの編集を無効にする
    const { record } = event;

    record['顧客番号'].disabled = true;
    record['顧客名'].disabled = true;

    console.log('test');
    return event;
  });
})();
