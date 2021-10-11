/**
 * プルダウンに「【選択してください】」と「全レコードを表示」を追加する処理
 * @type {string} targetID = 対象のプルダウンのID名
 */
function setInitSelect(targetID) {
  $(`#${targetID}`).append($('<option>').html('【選択してください】').val('init'));
  $(`#${targetID}`).append($('<option>').html('全レコードを表示').val('listall'));
  // console.log(targetID, '：セレクトボックスの初期値セット完了');
}

export default setInitSelect;
