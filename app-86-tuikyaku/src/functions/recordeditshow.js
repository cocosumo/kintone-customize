// [レコード編集画面]対象のレコードの編集を無効にする
const recordeditshow = (event) => {
  const {record} = event;

  record['顧客番号'].disabled = true;
  record['顧客名'].disabled = true;

  console.log('編集:一部フィールドの無効化');
  return event;
};

export default recordeditshow;
