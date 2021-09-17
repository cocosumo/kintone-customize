import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export const weeks = {
  日曜日: 0,
  月曜日: 1,
  火曜日: 2,
  水曜日: 3,
  木曜日: 4,
  金曜日: 5,
  土曜日: 6,
};

const EveryWeek = ({ intervalSettings, setIntervalSettings }) => {
  const handleToggle = (value) => () => {
    const currentIndex = intervalSettings.weekDays.indexOf(value);
    const newChecked = [...intervalSettings.weekDays];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setIntervalSettings((prev) => ({ ...prev, weekDays: newChecked }));
  };

  /*   const listItems = Object.entries(weeks).map(
    ([key, value]) => (
      <ListItem
        key={key + value}
        disablePadding
      >
        <ListItemButton onClick={handleToggle(value)} dense>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={intervalSettings.weekDays.indexOf(value) !== -1}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': key }}
            />
          </ListItemIcon>
          <ListItemText id={key} primary={`${key}`} />
        </ListItemButton>
      </ListItem>
    ),
  ); */

  const ListItems = () => Object.entries(weeks).map(([key, value]) => (
    <Grid
      key={key + value}
      item
      xs={6}
    >
      <Button
        key={key}
        id={key + value}
        sx={{ justifyContent: 'left', fontSize: 16 }}
        fullWidth
        onClick={handleToggle(value)}
        startIcon={(
          <Checkbox
            checked={intervalSettings.weekDays.indexOf(value) !== -1}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': key }}
          />
      )}
      >
        {key}
      </Button>
    </Grid>
  ));

  return (
    <Grid maxWidth={300} container>
      <ListItems />
    </Grid>
  );
};

export default EveryWeek;
