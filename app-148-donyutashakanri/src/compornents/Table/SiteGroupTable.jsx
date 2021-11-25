import PropTypes from 'prop-types';
import {CellHeader} from '@yumetetsu/ui';

const SiteGroupTable = ({site, records}) => {

  const fields = ['エリア店舗名', '導入他社数', '課金額'];
  const rowSpan = records.length;
  console.log('records', records);

  return (
    <article className="print_pages">
      <table className="print-table">
        <thead>
          <tr>
            <CellHeader> サイト名 </CellHeader>
            {fields.map(fieldname => {
              return <CellHeader key={fieldname}>{fieldname}</CellHeader>;
            })}
          </tr>
        </thead>
        <tbody>
          {
            records.map((record, index) =>{
              return (
                <tr key={site + record['エリア店舗名'].value}>
                  {
                    (index === 0) &&
                    <td rowSpan={rowSpan}>
                      {site}
                    </td>
                  }
                  {fields.map(fieldname => {
                    return <td key={fieldname}>{record[fieldname].value}</td>;
                  })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </article>
  );
};

SiteGroupTable.propTypes = {
  site: PropTypes.string,
  records: PropTypes.array
};

export default SiteGroupTable;