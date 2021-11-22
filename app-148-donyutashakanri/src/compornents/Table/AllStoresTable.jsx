import PropTypes from 'prop-types';
import getSiteLists from '../../helpers/getSiteLists';

const AllStoreTable = ({targetDate, data, componentRef}) => {

  // 媒体サイトの一覧を取得する
  const siteList = getSiteLists();

  console.log('siteLists', siteList);

  const vartype = typeof siteList;
  console.log('vartype: ', vartype);

  console.log('配列要素数', siteList.length);

  // 媒体サイト毎にフィルタリングする
  siteList.forEach(element => {
    console.log(element);
  });

  // レコードデータの置換処理
  const newTable = data.map(({エリア店舗名, 媒体サイト名, 導入他社数, 課金額, レコード番号})=>{
    return (
      <tr key={レコード番号.value}>
        <td key={[レコード番号.value, '01'].join()}>{媒体サイト名.value}</td>
        <td key={[レコード番号.value, '02'].join()}>{エリア店舗名.value}</td>
        <td key={[レコード番号.value, '03'].join()}>{導入他社数.value}</td>
        <td key={[レコード番号.value, '04'].join()}>{課金額.value}</td>
      </tr>
    );
  });

  const newMonth = targetDate.getMonth() + 1;
  const newYear = targetDate.getFullYear();


  return (
    <div ref={componentRef}>
      <article className="print-area">
        <span className="mainTitle"> {newYear}年{newMonth}月 全店舗 </span><br />
        <span className="subTitle"> 課金一覧 </span>
        <section className="print_pages">
          <table className="kakin_list">
            <thead>
              <tr>
                <th> 媒体サイト名 </th>
                <th> 店舗名 </th>
                <th> 導入他社数 </th>
                <th> 課金額 </th>
              </tr>
            </thead>
            <tbody>
              {newTable}
            </tbody>
          </table>
        </section>
      </article>
    </div>
  );
};


AllStoreTable.propTypes = {
  targetDate: PropTypes.object,
  data: PropTypes.array,
  componentRef: PropTypes.object
};

export default AllStoreTable;