import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { FormControl } from '@material-ui/core';

const MaterialText = ({
  id, label, value, onChange,
}) => (
  <Box
    component="form"
    sx={{
      marginTop: '0.3em',
      minWidth: 200,
    }}
    noValidate
    autoComplete="off"
  >
    <FormControl fullWidth>
      <TextField
        id={id}
        label={label}
        placeholder={`${label}を入力してください`}
        value={value || ''}
        onChange={onChange}
        multiline
        variant="standard"
      />
    </FormControl>
  </Box>

);

export default MaterialText;
