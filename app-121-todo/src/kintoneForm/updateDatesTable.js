import { format } from 'date-fns';
import { getFormRecord, setFormRecord } from '../../../kintone-api/api';

const updateDatesTable = (generatedDates, setSnackIsOpen) => {
  if (!generatedDates || !generatedDates.length) return;

  const { record } = getFormRecord();

  const { notifTable } = record;

  generatedDates.forEach((dt) => {
    notifTable.value.push({
      id: null,
      value: {
        notifDate: {
          type: 'DATE',
          value: format(dt, 'yyyy-MM-dd'),
        },
      },
    });
    setFormRecord({ record });
  });

  setSnackIsOpen(true);
};

export default updateDatesTable;
