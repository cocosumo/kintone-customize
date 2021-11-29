
import PropTypes from 'prop-types';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

/*
interface MultiSelectProps {
  options: string[], // 選択した店舗の配列
  label: string // 選択ボックスのラベル(アプリ「売却反響管理表」だと、"店舗")
  placeholder?: string // 全店舗 or 選択した店舗名が入る
  setOptions: Dispatch<SetStateAction<string[]>> // 実行する関数
} */

const MultiSelect = ({options, label, placeholder = '選択してください', setOptions}) => {

  const onChangeHandler = (_e, newValue) =>{
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

MultiSelect.propTypes = {
  options: PropTypes.array,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  setOptions: PropTypes.func
};
