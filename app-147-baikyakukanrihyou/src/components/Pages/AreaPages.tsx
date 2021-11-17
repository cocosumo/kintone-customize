import TableHankyo from '../Table/TableHankyo';
interface AreaPageProps {
  groupedRecords: {[key: string] : any},
  reportDate : Date | null
}

const AreaPage = ({groupedRecords = {}, reportDate}: AreaPageProps) => {

  const Pages = Object.entries<any>(groupedRecords)
    .map(([key, value]) => {
      return (
        <TableHankyo
          reportDate={reportDate}
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