const Table = (props) => {
  const children = props.data;
  console.log('table/{children}= ', children);

  return (
    <article>
      <h1> 課金一覧 </h1>
      <section>
        <table>
          <thead>
            <tr>
              <th>媒体サイト名</th>
              <th>店舗名</th>
              <th>導入他社数</th>
              <th>課金額</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>  </td>
            </tr>
          </tbody>
          {children}
        </table>
      </section>
    </article>
  );
};

export default Table;