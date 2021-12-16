import Grid from '@mui/material/Grid';
import {useEffect, useRef, useState} from 'react';
import {useReactToPrint} from 'react-to-print';
import PrintButton from './Buttons/PrintButton';

import {fetchBaikyakuHankyoGroupByArea} from '../backend/baikyakuHankyo';
import AreaPage from './Pages/ReportPages';
// import YearMonthPicker from './DatePickers/YearMonthPicker';
import MonthAndStore from './forms/MonthAndStore';


const BaikyakuSaitoHankyoKanriHyou = () => {
  const [groupedRecords, setGroupedRecords] = useState<GroupedRecords | null>(null);
  const [monthAndStore, setMonthAndStore] = useState<MonthAndStoreForm>(
    {reportDate: new Date(), stores: []});

  useEffect(()=> {
    const {reportDate} = monthAndStore;
    if (reportDate) {
      fetchBaikyakuHankyoGroupByArea(reportDate)
        .then((resp : GroupedRecords) => {
          setGroupedRecords(resp);
        });
    }
  }, [monthAndStore]);


  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const componentRef = useRef<HTMLDivElement>(null);

  console.log(monthAndStore.stores, 'stores');
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      mt={2}
    >
      <Grid item>
        <PrintButton onPrint={handlePrint} />
      </Grid>
      <Grid item>
        {groupedRecords && <MonthAndStore {...{monthAndStore, setMonthAndStore, groupedRecords}} />}
      </Grid>
      <Grid item>
        <div style={{'width': '100%'}} ref={componentRef}>
          {
            groupedRecords &&
            <AreaPage {...{
              reportDate: monthAndStore.reportDate,
              groupedRecords,
              stores: monthAndStore.stores
            }}
            />
          }
        </div>
      </Grid>
    </Grid>
  );
};

export default BaikyakuSaitoHankyoKanriHyou;