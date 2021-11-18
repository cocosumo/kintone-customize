import Stack from '@mui/material/Stack';
import {Printd} from 'printd';

const ReportGraphPage = () => {


  const d = new Printd();
  const handlePrint = () => {
    d.print(document.getElementById('report-view-gaia'));
  };


  return (
    <Stack
      justifyContent="center"
      alignContent="center"
    >
      <button onClick={handlePrint}>Print this out!</button>

    </Stack>
  );
};

export default ReportGraphPage;