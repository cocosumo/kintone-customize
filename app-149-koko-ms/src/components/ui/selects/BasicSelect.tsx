import {FormControl, Select, MenuItem, InputLabel, FormHelperText} from '@mui/material';

interface BasicSelectProps {
  label: string,
  options: Options,
  helperText?: string,
  required?: boolean
}

export default function BasicSelect({label, options, helperText, required} : BasicSelectProps) {
  return (
    <FormControl required={required} fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select label={label} required={required}>
        {options.map((option) => <MenuItem key={option.key || option.text} value={option.key || option.text}>{option.text}</MenuItem>)}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}