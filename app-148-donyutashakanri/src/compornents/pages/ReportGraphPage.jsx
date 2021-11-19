import Stack from '@mui/material/Stack';
import printHtmlBlock from 'print-html-block';
import PrintButton from '../PrintButton';

import './ReportGraphPage.css';

const elSelectorToPrint = '#report-view-gaia';

const ReportGraphPage = () => {

  const handlePrint = () => {
    printHtmlBlock(elSelectorToPrint, {importStyle: true});
  };

  return (
    <Stack
      justifyContent="center"
      alignContent="center"
    >
      <PrintButton onClick={handlePrint} />

    </Stack>
  );
};

export default ReportGraphPage;

