import {TextField} from '@mui/material';
import {ChangeEventHandler} from 'react';

interface Props{
  label: string
  value: string
  OnChangeFunc?: ChangeEventHandler
  disabled?: boolean
}

const TextSingle = ({label, value, OnChangeFunc, disabled = false}: Props) => {
  return (
    <TextField
      disabled={disabled}
      label={label}
      size="small"
      value={value}
      onChange={OnChangeFunc}
      sx={{
        width: '60%',
        backgroundColor: '#ffffff',
        font: '#333333'
      }}
    />
  );
};

export default TextSingle;