import TableHankyo from '../Table/TableHankyo';
import TableSummary from '../Table/TableSummary';

interface AreaPageProps {
  groupedRecords: {[key: string] : any}, // by area
  reportDate : Date | null
  stores?: string[]
}

const AreaPage = ({groupedRecords = {}, reportDate, stores}: AreaPageProps) => {

  const isStoresSelected = Boolean(stores?.length);

  const Pages = Object.entries<any>(groupedRecords)
    .map(([key, value]) => {
      const isRender = !isStoresSelected || stores?.includes(key);
      return (
        isRender &&
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