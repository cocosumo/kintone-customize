

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {Dispatch, SetStateAction} from 'react';

interface MultiSelectProps {
  options: string[],
  label: string
  placeholder?: string
  setOptions: Dispatch<SetStateAction<string[]>>
}

const MultiSelect = ({options, label, placeholder = '選択してください', setOptions} : MultiSelectProps) => {

  const onChangeHandler = (_e: any, newValue: string[]) =>{
    setOptions(newValue);
  };

  return (
    <Autocomplete
      multiple
      id="tags-outlined"
      options={options}
      getOptionLabel={(option) => option}
      filterSelectedOptions
      onChange={onChangeHandler}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
        />
      )}
    />

  );
};

export default MultiSelect;