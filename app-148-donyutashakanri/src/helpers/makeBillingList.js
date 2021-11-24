
const makeBillingList = (sites, groupedRecordsBySite, data = []) => {

  // サイト名がsitesの現在のindexの値(=サイト名)と等しいとき

  // const siteName = sites[i];
  // console.log('groupedRecordsBySite.keys :', siteName, groupedRecordsBySite[siteName]);
  // if (groupedRecordsBySite[siteName]) {

  // 対象のサイト名のレコードを、サイト名をラベルにして再編成する
  const objectPerSite = Object.entries(groupedRecordsBySite)
    .reduce((accu, curr) => {

      const [shop, records] = curr; // curr=サイト毎の各登録データの配列
      const values = records
        .reduce((_accu, _curr) => {
          const {エリア店舗名, 導入他社数, 課金額} = _curr;
          return {..._accu, ...{shop: エリア店舗名.value, num: 導入他社数.value, price: 課金額.value}};
        });

      // console.log('chk', values);
      // console.log('accu', accu);
      return {...accu, ...{[shop]: values}};
    }, {});
  // console.log('データチェック.keys', objectPerSite);

  const prevRecord = data[data.length - 1];
  if (prevRecord) {
    Object.keys(objectPerSite).forEach(site => {
      objectPerSite[site] += Object.values(prevRecord)[0][site];
    });
  }

  // data.push({[startDate.toISOString()]: objectPerSite});

  makeBillingList(
    groupedRecordsBySite,
    data
  );
  return data;
};

export default makeBillingList;
