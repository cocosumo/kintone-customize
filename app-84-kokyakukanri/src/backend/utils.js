export const excludedShopQuery = (shopField = '店舗名') => [
  'すてくら',
  '本部',
  'システム管理部',
  '本社', '買取店',
]
  .map((item) => `${shopField} not like "${item}"`)
  .join(' and ');

export const getStorageObj = (key) => JSON.parse(localStorage.getItem(key));
