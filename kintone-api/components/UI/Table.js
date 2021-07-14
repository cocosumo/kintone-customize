import './Table.css';

const Table = (props) => {
  const { headers, rows, emptyMessage } = props;
  console.log(rows, 'table');
  const jsxHeaders = headers.map((col) => <th key={col}>{col}</th>);

  const jsxRows = rows.map((row) => {
    console.log(row);

    return (
      <tr key={row}>
        {row.map((cell) => <td key={cell}>{cell}</td>)}
      </tr>
    );
  });
  const NotAvailable = () => <tr><td colSpan={headers.length}>{emptyMessage}</td></tr>;
  const isEmpty = !rows.length;

  return (
    <table className="react">
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
