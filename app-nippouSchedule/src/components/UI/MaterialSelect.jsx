import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useState } from 'react';
import actionTypeData from '../../static/actionTypeData';

const optionData = actionTypeData();

const MaterialSelect = ({ id, label, initialValue }) => {
  const [action, setAction] = useState(initialValue || optionData[0].type);

  const options = optionData.map(({ type }) => (
    <MenuItem key={type} value={type}>{type}</MenuItem>
  ));

  const handleChange = (event) => {
    setAction(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id={`${{ id }}-label`}>{label}</InputLabel>
        <Select
          labelId={`${{ id }}-label`}
          id={id}
          value={action}
          label={label}
          onChange={handleChange}
        >
          {options}
        </Select>
      </FormControl>
    </Box>
  );
};

export default MaterialSelect;
