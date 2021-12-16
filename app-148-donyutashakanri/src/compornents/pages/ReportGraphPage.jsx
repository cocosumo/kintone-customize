import {useEffect, useState} from 'react';
import Stack from '@mui/material/Stack';
import fetchDonyutashaRecordsByDate from '../../backend/donyutashakanri';
import printHtmlBlock from 'print-html-block';
import PrintButton from '../PrintButton';
import YearPicker from '../datepickers/YearPicker';

import './ReportGraphPage.css';

const elSelectorToPrint = '#report-view-gaia';

const ReportGraphPage = () => {

  const [records, setRecords] = useState([]);
  const [reportDate, setReportDate] = useState(new Date());

  console.log('records', records);

  useEffect(()=>{
    fetchDonyutashaRecordsByDate(reportDate).then(resp => {
      setRecords(resp);
    });
  }, [reportDate]);

  console.log('reportDate', reportDate);

  const handlePrint = () => {
    printHtmlBlock(elSelectorToPrint, {importStyle: true});
  };


  return (
    <Stack
      justifyContent="center"
      alignContent="center"
    >
      <PrintButton onClick={handlePrint} /><br />
      <YearPicker reportDate={reportDate} setReportDate={setReportDate} />
    </Stack>
  );
};

export default ReportGraphPage;

