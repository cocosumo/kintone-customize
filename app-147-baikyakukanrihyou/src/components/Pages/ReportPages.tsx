import TableHankyo from '../Table/TableHankyo';
import TableSummary from '../Table/TableSummary';

interface AreaPageProps {
  groupedRecords: {[key: string] : any}, // by area
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
    <>
      {Pages}
      <TableSummary groupedRecords={groupedRecords} />
    </>
  );
};

export default AreaPage;