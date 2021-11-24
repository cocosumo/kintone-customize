import PropTypes from 'prop-types';
import {groupRecordsByField} from '../../../../app-147-baikyakukanrihyou/src/helpers/utils';
import {CellHeader} from '@yumetetsu/ui';

const AllStoresTable = ({reportDate, data, componentRef}) => {
  // 媒体サイト毎に、データを再編する
  const groupBySite = groupRecordsByField(data, '媒体サイト名');
  console.log('groupBySiteの確認', groupBySite); // chk

  const sites = Object.keys(groupBySite);
  // console.log('★sites', sites);
  const newTable2 = () => {
    return (
      sites.map((key)=><CellHeader key={key}>{key}</CellHeader>)
    );
  };
  console.log('newTable2', newTable2);

  // レコードデータの置換処理
  const newTable = groupBySite.map(({エリア店舗名, 媒体サイト名, 導入他社数, 課金額, レコード番号})=>{
    return (
      <tr key={レコード番号.value}>
        <td key={[レコード番号.value, '01'].join()}>{媒体サイト名.value}</td>
        <td key={[レコード番号.value, '02'].join()}>{エリア店舗名.value}</td>
        <td key={[レコード番号.value, '03'].join()}>{導入他社数.value}</td>
        <td key={[レコード番号.value, '04'].join()}>{課金額.value}</td>
      </tr>
    );
  });

  const newMonth = reportDate.getMonth() + 1;
  const newYear = reportDate.getFullYear();


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


AllStoresTable.propTypes = {
  reportDate: PropTypes.object,
  data: PropTypes.array,
  componentRef: PropTypes.object
};

export default AllStoresTable;