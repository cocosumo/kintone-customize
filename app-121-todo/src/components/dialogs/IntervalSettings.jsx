import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useState } from 'react';
import addDays from 'date-fns/addDays';
import EveryWeek from '../forms/EveryWeek';
import CustomDatePicker from '../UI/CustomDatePicker';
import { eachMonthDayOfInterval, eachWeekDayOfInterval } from '../../helpers/time';
import EveryMonth from '../forms/EveryMonth';

const getRepeatDates = (intervalType, interval, intervalSettings) => {
  const { weekDays, monthDays } = intervalSettings;
  switch (intervalType) {
    case 'everyWeek':
      return eachWeekDayOfInterval(interval, weekDays);
    case 'everyMonth':
      return eachMonthDayOfInterval(interval, monthDays);
    default:
      break;
  }

  return null;
};

const FormContent = ({ intervalType, intervalSettings, setIntervalSettings }) => {
  switch (intervalType) {
    case 'everyWeek':
      return <EveryWeek {...{ intervalSettings, setIntervalSettings }} />;
    case 'everyMonth':
      return <EveryMonth {...{ intervalSettings, setIntervalSettings }} />;
    default:
      return null;
  }
};

const IntervalSettings = ({ intervalForm, closeFormHandler }) => {
  const [intervalSettings, setIntervalSettings] = useState({
    weekDays: [],
    monthDays: [],
  });
  const [untilDate, setUntilDate] = useState(addDays(new Date(), 30));
  const intervalType = intervalForm.selectValue;

  const generateHandler = async () => {
    const interval = {
      start: new Date(),
      end: untilDate,
    };
    const repeatDates = getRepeatDates(
      intervalType,
      interval,
      intervalSettings,
    );

    closeFormHandler(repeatDates);
  };

  return (
    <Dialog open={intervalForm.isOpen}>
      <DialogContent sx={{ overflow: 'hidden', mt: 2 }}>
        <CustomDatePicker {...{ untilDate, setUntilDate }} />
        <FormContent {...{ intervalSettings, setIntervalSettings, intervalType }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeFormHandler}>キャンセル</Button>
        <Button variant="contained" onClick={generateHandler} autoFocus>
          生成する
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default IntervalSettings;
