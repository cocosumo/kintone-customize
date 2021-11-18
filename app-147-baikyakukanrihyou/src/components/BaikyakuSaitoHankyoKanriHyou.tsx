import Grid from '@mui/material/Grid';
import {useEffect, useRef, useState} from 'react';
import {useReactToPrint} from 'react-to-print';
import PrintButton from './Buttons/PrintButton';

import {fetchBaikyakuHankyoGroupByArea} from '../backend/baikyakuHankyo';
import AreaPage from './Pages/ReportPages';
import YearMonthPicker from './DatePickers/YearMonthPicker';


const BaikyakuSaitoHankyoKanriHyou = () => {
  const [groupedRecords, setGroupedRecords] = useState<GroupedRecords | null>(null);
  const [reportDate, setReportDate] = useState<Date | null>(
    new Date(),
  );

  useEffect(()=> {
    if (reportDate) {
      fetchBaikyakuHankyoGroupByArea(reportDate)
        .then((resp : GroupedRecords) => {
          setGroupedRecords(resp);
        });
    }
  }, [reportDate]);


  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const componentRef = useRef<HTMLDivElement>(null);


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
        {reportDate && <YearMonthPicker {...{reportDate, setReportDate}} />}
      </Grid>
      <Grid item>
        <div style={{'width': '100%'}} ref={componentRef}>
          {groupedRecords && <AreaPage {...{reportDate, groupedRecords}} />}
        </div>
      </Grid>
    </Grid>
  );
};

export default BaikyakuSaitoHankyoKanriHyou;