import PropTypes from 'prop-types';
import {CellHeader, Row, Table, TableHead, TableBody, Cell} from '@yumetetsu/ui';

const SiteGroupTable = ({site, records}) => {

  const fields = ['エリア店舗名', '導入他社数', '課金額'];
  const rowSpan = records.length;
  console.log('records', records);

  return (
    <section className="print_pages" key="課金一覧">
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
          {
            records.map((record, index) =>{
              return (
                <Row key={site + record['エリア店舗名'].value}>
                  {
                    (index === 0) &&
                    <Cell rowSpan={rowSpan}>
                      {site}
                    </Cell>
                  }
                  {fields.map(fieldname => {
                    return <Cell key={fieldname}>{record[fieldname].value}</Cell>;
                  })
                  }
                </Row>
              );
            })
          }
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