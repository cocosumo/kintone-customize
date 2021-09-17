import { format } from 'date-fns';

const updateDatesTable = (generatedDates, setSnackIsOpen) => {
  if (!generatedDates || !generatedDates.length) return;

  const { record } = kintone.app.record.get();

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
    kintone.app.record.set({ record });
    console.log('requesting...');
  });

  setSnackIsOpen(true);
};

export default updateDatesTable;
