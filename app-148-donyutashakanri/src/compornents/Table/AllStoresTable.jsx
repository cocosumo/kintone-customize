import PropTypes from 'prop-types';
import {groupRecordsByField} from '../../../../app-147-baikyakukanrihyou/src/helpers/utils';
import {getMonth, getYear} from 'date-fns';
import SiteGroupTable from './SiteGroupTable';
import {CellHeader, Row, Table, TableHead, TableBody} from '@yumetetsu/ui';

const AllStoresTable = ({reportDate, data, componentRef}) => {
  // 媒体サイト毎に、データを再編する
  const groupBySite = groupRecordsByField(data, '媒体サイト名');
  // console.log('サイト毎のグループ配列の出力確認', groupBySite); // chk
  // const sites = Object.keys(groupBySite); // サイト名の配列を作成(sites)
  const newMonth = getMonth(reportDate) + 1;
  const newYear = getYear(reportDate);
  const fields = ['エリア店舗名', '導入他社数', '課金額'];

  // console.log('groupBySite', groupBySite);

  return (
    <div ref={componentRef}>
      <article className="print-area">
        <span className="mainTitle"> {newYear}年{newMonth}月 全店舗 </span><br />
        <span className="subTitle"> 課金一覧 </span>
        <section className="print_pages">
          <Table>
            <TableHead>
              <Row>
                <CellHeader> サイト名 </CellHeader>
                {fields.map(fieldname => {
                  return <CellHeader key={fieldname}>{fieldname}</CellHeader>;
                })}
              </Row>
            </TableHead>
            <TableBody>
              {Object.entries(groupBySite).map(([key, value]) => {
                return <SiteGroupTable key={key} site={key} records={value} fields={fields} />;
              })}

            </TableBody>
          </Table>
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