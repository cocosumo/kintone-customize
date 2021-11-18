import TableHankyo from '../Table/TableHankyo';


const AreaPage = ({groupedRecords = {}}: any) => {
  console.log(groupedRecords, 'grouped');
  const Pages = Object.entries<any>(groupedRecords)
    .map(([key, value]) => {
      console.log(value);
      return (
        <TableHankyo
          records={value}
          title={key}
          key={key}
        />);
    });

  return (
    <>{Pages}
    </>
  );
};

export default AreaPage;