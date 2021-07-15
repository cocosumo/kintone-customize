import './Table.css';

/**
 * @param {array} headers - ヘーダ―.
 * @param {array[]} rows - の内容.
 * @param {string} emptyMessage - 空っぽの時のメッセージ.
 */

const Table = (props) => {
  const { headers, rows, emptyMessage } = props;
  // console.log(rows, 'table');
  const jsxHeaders = headers.map((col) => <th key={col}>{col}</th>);

  const jsxRows = rows.map((row) => (
    <tr key={row}>
      {row.map((cell) => <td key={cell}>{cell}</td>)}
    </tr>
  ));
  const NotAvailable = () => <tr><td colSpan={headers.length}>{emptyMessage}</td></tr>;
  const isEmpty = !rows.length;

  return (
    <table className="react table">
      <thead>
        <tr>
          {jsxHeaders}
        </tr>
      </thead>
      <tbody>
        {isEmpty && <NotAvailable />}
        {!isEmpty && jsxRows}
      </tbody>
    </table>
  );
};
export default Table;
