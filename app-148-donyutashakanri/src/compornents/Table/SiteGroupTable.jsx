import PropTypes from 'prop-types';
import {CellHeader, Row, Table, TableHead, TableBody, Cell} from '@yumetetsu/ui';

const SiteGroupTable = ({site, records}) => {

  const fields = ['エリア店舗名', '導入他社数', '課金額'];
  // console.log('records', records);

  return (
    <section className="print_pages" key="課金一覧">
      <Table key={site} className="siteTable">
        <TableHead>
          <Row>
            <CellHeader colSpan="3"> {site} </CellHeader>
          </Row>
          <Row>
            {fields.map(fieldname => {
              return <CellHeader key={fieldname}>{fieldname}</CellHeader>;
            })}
          </Row>
        </TableHead>
        <TableBody>

          {records.map((record) =>{
            return (

              <Row key={site + record['エリア店舗名'].value}>
                {fields.map(fieldname => {
                  return <Cell key={fieldname}>{record[fieldname].value}</Cell>;
                })
                }
              </Row>

            );
          })}
        </TableBody>
      </Table>
    </section>
  );
};

SiteGroupTable.propTypes = {
  site: PropTypes.string,
  records: PropTypes.array
};

export default SiteGroupTable;