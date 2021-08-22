import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CircleTwoToneIcon from '@material-ui/icons/CircleTwoTone';

const MaterialSelect = ({
  id, label, value, onChange, optionsData,
}) => {
  const options = optionsData.map(({ type, bgColor }) => (
    <MenuItem key={type} value={type}>
      <CircleTwoToneIcon sx={{ color: bgColor, fontSize: '1em', marginRight: 1 }} />
      {type}
    </MenuItem>
  ));

  return (
    <Box sx={{ minWidth: 120, marginTop: '1em' }}>
      <FormControl
        fullWidth
        variant="standard"
      >
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
