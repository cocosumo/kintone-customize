/* eslint-disable react/jsx-props-no-spreading */

import TextField from '@mui/material/TextField';
// import AdapterLuxon from '@mui/lab/AdapterLuxon';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import jaLocale from 'date-fns/locale/ja';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Box from '@mui/material/Box';

const CustomDatePicker = ({ untilDate, setUntilDate }) => (
  <Box sx={{ mx: 2, mb: 2 }}>
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={jaLocale}>
      <DatePicker
        label="いつまでですか。"
        value={untilDate}
        onChange={(newValue) => {
          setUntilDate(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  </Box>
);

export default CustomDatePicker;
