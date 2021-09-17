import { useEffect, useState } from 'react';

import updateDatesTable from '../../kintoneForm/updateDatesTable';
import IntervalSettings from '../dialogs/IntervalSettings';
import SelectInterval from '../UI/SelectInterval';
import SuccessSnack from '../UI/SuccessSnack';
import Progress from '../UI/Progress';
import GlobalTheme from '../themes/GlobalTheme';

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
  const [reminderDates, setReminderDates] = useState([]);

  useEffect(() => {
    if (reminderDates?.length) {
      const timer = setTimeout(() => {
        updateDatesTable(reminderDates, setSnackIsOpen);
        setReminderDates([]);
      }, 100);

      return () => clearTimeout(timer);
    }
    return null;
  }, [reminderDates]);

  const closeFormHandler = (generatedDates) => {
    setIntervalForm((prev) => ({ ...prev, isOpen: false }));

    setReminderDates(generatedDates);
  };

  const closeSnackHandler = () => {
    setSnackIsOpen(false);
  };
  console.log('rerendered');
  return (
    <GlobalTheme>
      <SelectInterval
        selectValue={intervalForm.selectValue}
        {...{ items, setIntervalForm }}
      />
      <IntervalSettings {...{ items, intervalForm, closeFormHandler }} />
      <SuccessSnack {...{ snackIsOpen, closeSnackHandler }} />
      {Boolean(reminderDates?.length) && <Progress /> }
    </GlobalTheme>
  );
};

export default App;
