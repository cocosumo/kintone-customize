import TableHankyo from '../Table/TableHankyo';


const AreaPage = ({groupedRecords = {}}: any) => {

  const Pages = Object.entries<any>(groupedRecords)
    .map(([key, value]) => {
      return (
        <TableHankyo
          records={value}
          title={key}
          key={key}
        />);
    });

  return (
    <>{Pages}</>
  );
};

export default AreaPage;