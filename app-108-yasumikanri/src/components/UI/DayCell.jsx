import { Box } from '@mui/material';
import { isWithinMonth, JSDToLux } from '../../helpers/time';
import DayContent from './DayContent';
import DayHeader from './DayHeader';

const DayCell = ({
  args,
  yasumiRecords,
  currentMonth,
}) => {
  const { date, dayNumberText } = args;
  const luxDate = JSDToLux(date);
  const cellDate = luxDate.toISODate();
  const isRenderDate = isWithinMonth(currentMonth.current, luxDate);
  const isExist = yasumiRecords && yasumiRecords[cellDate];
  let dayRecords;

  if (isExist) {
    dayRecords = yasumiRecords[cellDate];
  }

  return (
    <Box style={{ margin: 'auto 0 auto 0', width: '100%' }}>
      <DayHeader {...{ isRenderDate, dayNumberText }} />
      <Box sx={{ height: 60 }}>
        {isExist && (<DayContent {...{ dayRecords }} />)}
      </Box>
    </Box>
  );
};

export default DayCell;
