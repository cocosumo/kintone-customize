import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import jaLocale from 'date-fns/locale/ja';
import MuiDatePicker from '@mui/lab/DatePicker';
import {useState} from 'react';
import {FormControl, FormGroup, FormHelperText, Stack} from '@mui/material';
import BasicSelect from '../selects/BasicSelect';
import {Box} from '@mui/system';

const monthOptions: Options = [...Array(12)].map((_, i) => ({key: i + 1, text: `${i + 1}月`}));

/* TODO: Pass the state up */
export default function SeparatedDatePicker() {
  const [value, setValue] = useState<Date | null>(
    new Date(),
  );

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };


  const dayOptions: Options = [...Array(31)].map((_, i) => ({key: i + 1, text: `${i + 1}日`}));

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={jaLocale}>
      <FormControl>
        <FormGroup>
          <Stack direction="row" spacing={1}>
            <Box minWidth={150}>
              <MuiDatePicker
                views={['year']}
                label="生年"
                inputFormat="yyyy年"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </Box>

            <BasicSelect label="月" options={monthOptions} />
            <BasicSelect label="日" options={dayOptions} />
          </Stack>
        </FormGroup>
        <FormHelperText>{`<任意>個別設定可`}</FormHelperText>
      </FormControl>
    </LocalizationProvider>
  );
}