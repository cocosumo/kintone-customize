/* eslint-disable react/jsx-props-no-spreading */
import AdapterLuxon from '@material-ui/lab/AdapterLuxon';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import TextField from '@material-ui/core/TextField';
import TimePicker from '@material-ui/lab/TimePicker';
import {
  Box, FormControl,
} from '@material-ui/core';
import { useState } from 'react';

import { timeTo24Format } from '../../helpers/Time';

const MaterialTimePicker = ({
  id, value, label, minTime, maxTime, onChange, isRequired, setErrorCount,
}) => {
  const [error, setError] = useState();

  const errorHandler = (reason) => {
    switch (reason) {
      case 'invalidDate':
        setError('無効な時間です');
        break;
      case 'maxTime':
        setError(`${timeTo24Format(maxTime)}まで設定してください`);
        break;
      case 'minTime':
        setError(`開始時間（${timeTo24Format(minTime)}）から設定してください`);
        break;
      default:
        setError(null);
        break;
    }

    setErrorCount((prev) => prev + (reason ? 1 : -1));
  };

  return (
    <Box sx={{ minWidth: 120, marginTop: '1em' }}>
      <FormControl fullWidth>
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <TimePicker
            ampm={false}
            label={label}
            value={value}
            onChange={onChange}
            cancelText="キャンセル"
            okText="保存"
            onError={errorHandler}
            renderInput={(params) => (
              <TextField
                id={id}
                variant="standard"
                required={isRequired}
                {...params}
                InputLabelProps={{ style: { fontSize: 16 } }}
                helperText={error}
              />
            )}
            minTime={minTime}
            maxTime={maxTime}
            InputProps={{ style: { fontSize: 20 } }}
          />
        </LocalizationProvider>
      </FormControl>
    </Box>
  );
};

export default MaterialTimePicker;
