import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import { FormControl } from '@material-ui/core';

const MaterialText = ({ id, label, initialValue }) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        marginTop: '1em',
        minWidth: 120,
      }}
      noValidate
      autoComplete="off"
    >
      <FormControl fullWidth>
        <TextField
          id={id}
          label={label}
          placeholder={`こちらに${label}を入力してください`}
          value={value || ''}
          onChange={handleChange}
          multiline
          variant="standard"
        />
      </FormControl>
    </Box>

  );
};

export default MaterialText;
