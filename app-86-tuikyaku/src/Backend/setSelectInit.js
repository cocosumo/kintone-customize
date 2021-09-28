/**
 * プルダウンに「---」と「全てのレコードを表示」を追加する処理
 * @type {string} targetID = 対象のプルダウンのID名
 */
function setInitSelect(targetID) {
  const newitem = document.createElement('option');
  newitem.value = 'init';
  newitem.innerText = '---';
  document.getElementById((targetID)).appendChild(newitem);
  const newitem2 = document.createElement('option');
  newitem2.value = 'listall';
  newitem2.innerText = '全てのレコードを表示';
  document.getElementById((targetID)).appendChild(newitem2);
  console.log('セレクトボックスの初期値セット完了');
}

export default setInitSelect;
