import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';

const EveryMonth = ({ intervalSettings, setIntervalSettings }) => {
  const { monthDays } = intervalSettings;
  const menuItems = [...Array(31).keys()].map((i) => (
    <MenuItem key={i} value={i}>
      <Checkbox checked={monthDays.indexOf(i) > -1} />
      <ListItemText primary={`${i + 1}日`} />
    </MenuItem>
  ));

  const onSelectChangehandler = (info) => {
    setIntervalSettings(
      (prev) => ({ ...prev, monthDays: info.target.value }),
    );
  };

  return (
    <Box sx={{ mb: 2, mx: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="multiDaysOfMonth">毎月何日ですか。</InputLabel>
        <Select
          labelId="multiDaysOfMonth"
          id="multiDay"
          multiple
          input={<OutlinedInput label="毎月何日ですか。" />}
          value={monthDays}
          onChange={onSelectChangehandler}
          renderValue={
            (selected) => selected
              .sort()
              .map((i) => `${i + 1}日`)
              .join(', ')
}
        >
          {menuItems}

        </Select>
      </FormControl>
    </Box>
  );
};

export default EveryMonth;
