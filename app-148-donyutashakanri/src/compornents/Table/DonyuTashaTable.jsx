import PropTypes from 'prop-types';
import Title from '../typhograhies/Title';
import {CellHeader, Cell, Table, Row, TableHead, TableBody} from '@yumetetsu/ui';
import {groupRecordsByField} from '../../../../app-147-baikyakukanrihyou/src/helpers/utils';
import {parseISO} from 'date-fns';
import {generateTotal} from '../../helpers/utilities';
// import {fiscalYearRange} from '../../helpers/time';

const DonyuTashaTable = ({records, title, startDate, endDate}) => {
  const groupBysites = groupRecordsByField(records, '媒体サイト名');
  const sites = Object.keys(groupBysites);
  const cummulative = generateTotal(startDate, endDate, groupBysites);

  return (
    <article>
      <table className="print-area">
        <tbody>
          <tr>
            <th>
              <Title>{title} 導入他社数一覧</Title><br />
            </th>
          </tr>
          <tr>
            <td>
              <Table>
                <TableHead>
                  <Row>
                    <CellHeader>年</CellHeader>
                    <CellHeader>月</CellHeader>
                    {sites.map((key)=><CellHeader key={key}>{key}</CellHeader>)}
                  </Row>
                </TableHead>
                <TableBody>
                  { cummulative.map((data) => {
                    // console.log('data', data);
                    const [key, value] = Object.entries(data)[0];
                    const reportYear = parseISO(key).getFullYear();
                    const reportMonth = parseISO(key).getMonth() + 1;
                    // console.log('key', reportYear + '年' + reportMonth + '月' + title);

                    return (
                      <Row key={reportYear + '年' + reportMonth + '月' + title}>
                        <Cell>{reportYear}</Cell>
                        <Cell>{reportMonth}</Cell>

                        {sites.map((site)=>{
                          return <Cell key={site}>{value[site]}</Cell>;
                        })}

                      </Row>);
                  })}
                </TableBody>
              </Table>
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <br />
    </article>
  );
};

DonyuTashaTable.propTypes = {
  records: PropTypes.array,
  title: PropTypes.string,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
};

export default DonyuTashaTable;