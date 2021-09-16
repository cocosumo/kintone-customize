import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const SelectInterval = ({ items, selectValue, setIntervalForm }) => {
  const menuItems = Object.entries(items).map(
    ([val, label]) => <MenuItem key={val} value={val}>{label}</MenuItem>,
  );

  const onSelectChangeHandler = (info) => {
    setIntervalForm({
      isOpen: true,
      selectValue: info.target.value,
    });
  };

  const onOpenSelecthandler = () => {
    setIntervalForm((prev) => ({ ...prev, selectValue: '' }));
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="intervalSelect">いつリマインドをしますか。</InputLabel>
      <Select
        labelId="intervalSelect"
        id="intervalSelect"
        label="いつリマインドをしますか。"
        value={selectValue}
        onChange={onSelectChangeHandler}
        sx={{ minWidth: 320 }}
        onOpen={onOpenSelecthandler}
      >
        {menuItems}

      </Select>
    </FormControl>
  );
};

export default SelectInterval;
