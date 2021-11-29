import PropTypes from 'prop-types';
import Title from '../typhograhies/Title';
import {CellHeader, Cell, Table, Row, TableHead, TableBody} from '@yumetetsu/ui';
import {groupRecordsByField} from '../../../../app-147-baikyakukanrihyou/src/helpers/utils';
// import {parseISO} from 'date-fns';
// import { generateTotal } from '../../helpers/utilities';

const DonyuTashaTable = ({records, title, startDate, endDate}) => {

  const groupBysites = groupRecordsByField(records, '媒体サイト名');
  const sites = Object.keys(groupBysites);

  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth() + 1;
  const endYear = endDate.getFullYear();
  const endMonth = endDate.getMonth();
  console.log('開始年月', startYear, '年', startMonth, '月');
  console.log('終了年月', endYear, '年', endMonth, '月');

  // const fiscalYear = fiscalYearRange(reportDate);
  // const cummulative = generateTotal(fiscalYear.start, fiscalYear.end, groupByArea);

  return (
    <>
      <Title>{title} 導入他社数一覧</Title>
      <Table>
        <TableHead>
          <Row>
            <CellHeader>年</CellHeader>
            <CellHeader>月</CellHeader>
            {sites.map((key)=><CellHeader key={key}>{key}</CellHeader>)}
          </Row>
        </TableHead>
        <TableBody>
          {console.log('records', records)}
          {/* cummulative.map(data => { */
            records.map((data) => {
            const [key, value] = Object.entries(data)[0]; */

              return (
                <Row key={startYear + startMonth}>
                  <Cell>{startYear}</Cell>
                  <Cell>{startMonth}</Cell>

                  {sites.map((site)=>{
                    return <Cell key={site}>{value[site]}</Cell>;
                  })}

                </Row>);
            })}
        </TableBody>
      </Table>
    </>
  );
};

DonyuTashaTable.propTypes = {
  records: PropTypes.array,
  title: PropTypes.string,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
};

export default DonyuTashaTable;