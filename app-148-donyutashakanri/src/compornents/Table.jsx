
import PropTypes from 'prop-types';
import React, {useRef} from 'react';
import ReactToPrint from 'react-to-print';
import PrintButton from '../compornents/PrintButton';
import Header from '../compornents/Header';

const Table = ({area, data}) => {
  console.log('table/{data}= ', data);

  const newTable = data.map(({エリア店舗名, 媒体サイト名, 導入他社数, 課金額, 適用年月, レコード番号})=>{
    return (
      <tr key={レコード番号.value}>
        <td key={[レコード番号.value, '01'].join()}>{エリア店舗名.value}</td>
        <td key={[レコード番号.value, '02'].join()}>{媒体サイト名.value}</td>
        <td key={[レコード番号.value, '03'].join()}>{導入他社数.value}</td>
        <td key={[レコード番号.value, '04'].join()}>{課金額.value}</td>
        <td key={[レコード番号.value, '05'].join()}>{適用年月.value}</td>
      </tr>
    );
  });

  const newTable2 = '仮置き';
  const componentRef = useRef();

  return (
    <>
      <ReactToPrint
        trigger={() => <PrintButton onClick={window.print} />}
        content={() => componentRef.current}
      />

      <article className="print-area" ref={componentRef}>
        <Header area={area} />
        <h2> 課金一覧 </h2>
        <section className="print_pages">
          <table className="kakin_list">
            <thead>
              <tr>
                <th> 媒体サイト名 </th>
                <th> 店舗名 </th>
                <th> 導入他社数 </th>
                <th> 課金額 </th>
                <th> 適用年月 </th>
              </tr>
            </thead>
            <tbody>
              {newTable}
            </tbody>
          </table>
        </section>
      </article>
    </>
  );
};

/*       <h2> 導入他社数一覧 </h2>
      <section className="print_pages">
        <table className="donyutashasu_list">
          <tbody>
            {newTable2}
          </tbody>
        </table>
      </section> */

Table.propTypes = {
  area: PropTypes.string,
  data: PropTypes.array
};

export default Table;