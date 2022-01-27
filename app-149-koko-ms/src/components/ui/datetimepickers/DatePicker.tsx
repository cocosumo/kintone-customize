import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import jaLocale from 'date-fns/locale/ja';
import MuiDatePicker from '@mui/lab/DatePicker';
import {useState} from 'react';

interface DatePickerProps {
  label: string,
}

/* TODO: Pass the state up */
export default function DatePicker({label}:DatePickerProps) {
  const [value, setValue] = useState<Date | null>(
    new Date(),
  );

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  console.log(jaLocale);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={jaLocale}>
      <MuiDatePicker
        label={label}
        value={value}
        onChange={handleChange}
        renderInput={(params) => <TextField helperText="推測だけでもいいです。ｗ" fullWidth {...params} />}
      />

    </LocalizationProvider>
  );
}