import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const MaterialSelect = ({
  id, label, value, onChange, optionsData,
}) => {
  const options = optionsData.map(({ type }) => (
    <MenuItem key={type} value={type}>{type}</MenuItem>
  ));

  return (
    <Box sx={{ minWidth: 120, marginTop: '1em' }}>
      <FormControl fullWidth>
        <InputLabel id={`${{ id }}-label`}>{label}</InputLabel>
        <Select
          labelId={`${{ id }}-label`}
          id={id}
          value={value}
          label={label}
          onChange={onChange}
        >
          {options}
        </Select>
      </FormControl>
    </Box>
  );
};

export default MaterialSelect;
