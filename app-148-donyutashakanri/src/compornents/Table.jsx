const Table = (props) => {
  const {children} = props;

  return (
    <table>
      {children}
    </table>
  );
};

export default Table;