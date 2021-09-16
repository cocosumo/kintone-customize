import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import updateDatesTable from '../../kintoneForm/updateDatesTable';
import IntervalSettings from '../dialogs/IntervalSettings';
import SelectInterval from '../UI/SelectInterval';

const items = {
  everyWeek: '毎週',
  everyMonth: '毎月',
};

const App = () => {
  const [intervalForm, setIntervalForm] = useState({
    isOpen: false,
    selectValue: '',
  });
  const [snackIsOpen, setSnackIsOpen] = useState(false);

  const closeFormHandler = (generatedDates) => {
    updateDatesTable(generatedDates, setSnackIsOpen);
    setIntervalForm((prev) => ({ ...prev, isOpen: false }));
  };

  const closeSnackHandler = () => {
    setSnackIsOpen(false);
  };

  return (
    <>
      <SelectInterval
        selectValue={intervalForm.selectValue}
        {...{ items, setIntervalForm }}
      />
      <IntervalSettings {...{ items, intervalForm, closeFormHandler }} />

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackIsOpen}
        autoHideDuration={3000}
        onClose={closeSnackHandler}
      >
        <Alert
          onClose={closeSnackHandler}
          severity="success"
          variant="filled"
        >
          成功！！
        </Alert>
      </Snackbar>
    </>
  );
};

export default App;
