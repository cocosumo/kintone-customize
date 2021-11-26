import PropTypes from 'prop-types';
import {Row, Cell} from '@yumetetsu/ui';

const SiteGroupTable = ({site, records, fields}) => {

  const rowSpan = records.length;

  return (
    records.map((record, index) => {
      return (
        <Row key={site + record['エリア店舗名'].value}>
          {
            (index === 0) &&
            <td rowSpan={rowSpan} selectName="putTogether">
              {site}
            </td>
          }
          {fields.map(fieldname => {
            return <Cell key={fieldname}>{record[fieldname].value}</Cell>;
          })
          }
        </Row>
      );
    })
  );
};

SiteGroupTable.propTypes = {
  site: PropTypes.string,
  records: PropTypes.array,
  fields: PropTypes.array
};

export default SiteGroupTable;