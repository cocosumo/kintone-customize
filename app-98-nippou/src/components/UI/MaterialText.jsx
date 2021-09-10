import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

const MaterialText = ({
  id, label, value, onChange,
}) => (
  <Box
    component="form"
    sx={{
      marginTop: '1em',
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
        InputProps={{ style: { fontSize: 16 } }}
        InputLabelProps={{ style: { fontSize: 16 } }}
      />
    </FormControl>
  </Box>

);

export default MaterialText;
