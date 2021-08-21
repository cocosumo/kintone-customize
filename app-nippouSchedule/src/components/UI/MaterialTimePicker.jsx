/* eslint-disable react/jsx-props-no-spreading */
import AdapterLuxon from '@material-ui/lab/AdapterLuxon';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import TextField from '@material-ui/core/TextField';

import TimePicker from '@material-ui/lab/TimePicker';
import { Box, FormControl } from '@material-ui/core';

const MaterialTimePicker = ({
  id, value, label, minTime, maxTime, onChange,
}) => {
  const onChangeHandler = (newValue) => {
    onChange(newValue);
  };

  return (
    <Box sx={{ minWidth: 120, marginTop: '1em' }}>
      <FormControl fullWidth>
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <TimePicker
            ampm={false}
            label={label}
            value={value}
            showToolbar
            onChange={onChangeHandler}
            renderInput={(params) => <TextField id={id} {...params} />}
            minTime={minTime}
            maxTime={maxTime}
          />
        </LocalizationProvider>
      </FormControl>
    </Box>
  );
};

export default MaterialTimePicker;
