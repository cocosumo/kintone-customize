import { useState } from 'react';
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

  const closeFormHandler = (generatedDates) => {
    updateDatesTable(generatedDates);
    setIntervalForm((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <>
      <SelectInterval
        selectValue={intervalForm.selectValue}
        {...{ items, setIntervalForm }}
      />
      <IntervalSettings {...{ items, intervalForm, closeFormHandler }} />
    </>
  );
};

export default App;
