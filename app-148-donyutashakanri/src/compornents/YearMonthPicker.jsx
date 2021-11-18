import PropTypes from 'prop-types';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {ja} from 'date-fns/locale';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import {Dispatch, SetStateAction} from 'react';

const YearMonthPicker = ({reportDate, setReportDate}) => {

  const changeHandler = (newValue) => {
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

YearMonthPicker.propTypes = {
  reportDate: PropTypes.object,
  setReportDate: PropTypes.func
};

export default YearMonthPicker;
