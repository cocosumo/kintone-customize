
import PropTypes from 'prop-types';
import Header from '../Header';
import {CellHeader, Row, Table, TableHead, TableBody, Cell} from '@yumetetsu/ui';
import {getMonth, getYear} from 'date-fns';

const PerStoreTable = ({area, data, componentRef, reportDate}) => {
  const newTable = data.map(({エリア店舗名, 媒体サイト名, 導入他社数, 課金額, レコード番号})=>{
    return (
      <Row key={レコード番号.value}>
        <Cell key={[レコード番号.value, '01'].join()}>{エリア店舗名.value}</Cell>
        <Cell key={[レコード番号.value, '02'].join()}>{媒体サイト名.value}</Cell>
        <Cell key={[レコード番号.value, '03'].join()}>{導入他社数.value}</Cell>
        <Cell key={[レコード番号.value, '04'].join()}>{課金額.value}</Cell>
      </Row>
    );
  });

  const newMonth = getMonth(reportDate) + 1;
  const newYear = getYear(reportDate);

  return (
    <div ref={componentRef}>
      <article className="print-area">
        <Header area={area} /><br />
        <span className="subTitle"> {newYear}年{newMonth}月 課金一覧 </span>
        <Table>
          <TableHead>
            <Row>
              <CellHeader> 店舗名 </CellHeader>
              <CellHeader> 媒体サイト名 </CellHeader>
              <CellHeader> 導入他社数 </CellHeader>
              <CellHeader> 課金額 </CellHeader>
            </Row>
          </TableHead>
          <TableBody>
            {newTable}
          </TableBody>
        </Table>
      </article>
    </div>
  );
};


PerStoreTable.propTypes = {
  area: PropTypes.string,
  data: PropTypes.array,
  componentRef: PropTypes.object,
  reportDate: PropTypes.object
};

export default PerStoreTable;