import {TextField} from '@mui/material';
import {ChangeEventHandler} from 'react';

const TextSingle = ({label, value, OnChangeFunc}: Props) => {
  return (
    <TextField
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
interface Props{
  label: string
  value: string
  OnChangeFunc: ChangeEventHandler
}

export default TextSingle;