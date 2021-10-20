// eslint-disable-next-line import/prefer-default-export
export const excludedShopQuery = (shopField = '店舗名') => [
  'すてくら',
  '本部',
  'システム管理部',
  '本社', '買取店',
]
  .map((item) => `${shopField} not like "${item}"`)
  .join(' and ');
