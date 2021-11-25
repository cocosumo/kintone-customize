import PropTypes from 'prop-types';

const SiteGroupTable = ({site, records}) => {

  const fields = ['エリア店舗名', '導入他社数', '課金額'];
  const rowSpan = records.length;
  console.log('records', records);

  return (
    <table>
      <thead>
        <tr>
          <th> サイト名 </th>
          {fields.map(fieldname => {
            return <th key={fieldname}>{fieldname}</th>;
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
  );
};

SiteGroupTable.propTypes = {
  site: PropTypes.string,
  records: PropTypes.array
};

export default SiteGroupTable;