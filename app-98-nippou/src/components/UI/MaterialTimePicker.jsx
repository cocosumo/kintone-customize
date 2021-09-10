/* eslint-disable react/jsx-props-no-spreading */
import AdapterLuxon from '@mui/lab/AdapterLuxon';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import TextField from '@mui/material/TextField';
import TimePicker from '@mui/lab/TimePicker';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';

import { useState } from 'react';

import { timeTo24Format } from '../../helpers/Time';
import { isMobile } from '../../../../kintone-api/api';

const MaterialTimePicker = ({
  id, value, label, minTime, maxTime, onChange, isRequired, setErrorFields,
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

    setErrorFields((prev) => {
      const temp = { ...prev };
      if (reason) {
        temp[label] = label;
        return temp;
      }
      delete temp[label];
      return temp;
    });
  };
  return (
    <Box sx={{ minWidth: 120, marginTop: '1em' }}>
      <FormControl fullWidth>
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <TimePicker
            ampm={false}
            orientation={isMobile() ? 'portrait' : 'landscape'}
            label={label}
            value={value}
            onChange={(newValue) => {
              onChange(newValue);
            }}
            cancelText="キャンセル"
            okText="保存"
            onError={errorHandler}
            showToolbar
            renderInput={(params) => (
              <TextField
                id={id}
                variant="standard"
                required={isRequired}
                InputLabelProps={{ style: { fontSize: 16 } }}
                helperText={error}
                {...params}
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
