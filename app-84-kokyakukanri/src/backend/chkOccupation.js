/**
 * 社員名簿のリストから所属店舗(affShop)を取り出し、営業職か判定する(FlgOcpChk)
 *
 * @param {Array} lists : 社員名簿のリスト[{ name: 氏名, shop: 店舗}]
 * @param {string} targetName : 確認対象の社員名
 * @returns {string} targetShop : 対象社員の所属店舗(affShop)
 */
export default function chkOccupation(lists, targetName) {
  // 絞り込み表示対象者の所属店舗を設定する
  let targetShop = lists.find(item => item.name === targetName);
  targetShop = (targetShop === undefined) ? 'init' : targetShop.shop;
  if (targetShop !== 'init') {
    return targetShop;
  }
  const newName = targetName.replace(' ', '　');
  targetShop = lists.find(item => item.name === newName);
  return (targetShop === undefined) ? 'init' : targetShop.shop;
}
