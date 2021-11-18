import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {ja} from 'date-fns/locale';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import {Dispatch, SetStateAction} from 'react';

interface YearMonthPickerProps {
  reportDate: Date,
  setReportDate : Dispatch<SetStateAction<Date | null>>
}

const YearMonthPicker = ({reportDate, setReportDate}: YearMonthPickerProps) => {


  const changeHandler = (newValue: Date | null) => {
    setReportDate(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ja}>
      <DatePicker
        label="年月"
        value={reportDate}
        openTo="month"
        inputFormat="yyyy年MM月"
        views={['year', 'month']}
        onChange={changeHandler}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default YearMonthPicker;