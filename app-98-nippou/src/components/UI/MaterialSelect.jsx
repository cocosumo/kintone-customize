import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CircleTwoToneIcon from '@mui/icons-material/CircleTwoTone';

const MaterialSelect = ({
  id, label, value, onChange, optionsData,
}) => {
  const options = optionsData.map(({ type, bgColor }) => (
    <MenuItem
      key={type}
      value={type}
      sx={{ fontSize: 16 }}
    >
      <CircleTwoToneIcon sx={{ color: bgColor, fontSize: '1em', marginRight: 1 }} />
      {type}
    </MenuItem>
  ));

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl
        fullWidth
        variant="standard"
      >
        <InputLabel
          id={`${{ id }}-label`}
          sx={{ fontSize: 16 }}
        >
          {label}

        </InputLabel>
        <Select
          labelId={`${{ id }}-label`}
          id={id}
          value={value}
          label={label}
          onChange={onChange}
          sx={{ fontSize: 24 }}
        >
          {options}
        </Select>
      </FormControl>
    </Box>
  );
};

export default MaterialSelect;
