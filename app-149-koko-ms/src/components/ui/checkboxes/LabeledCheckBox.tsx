import {FormControlLabel, Checkbox} from '@mui/material';

interface LabeledCheckBoxProps {
  label?: string,
  checked? : boolean,
  setCheckedHandler?: ()=>void,
}

export default function LabeledCheckBox({
  label = '',
  checked = false,
  setCheckedHandler,
}: LabeledCheckBoxProps) {

  return (
    <FormControlLabel
      control={
        <Checkbox defaultChecked checked={checked} onChange={setCheckedHandler} />}
      label={label}
    />
  );
}