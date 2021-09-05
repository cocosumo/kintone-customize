import { Box } from '@mui/material';
import { JSDToLux } from '../../helpers/time';
import DayContent from './DayContent';
import DayHeader from './DayHeader';

const DayCell = ({
  args,
  yasumiRecords,
}) => {
  const { date, dayNumberText } = args;
  const cellDate = JSDToLux(date).toISODate();
  const isExist = yasumiRecords && yasumiRecords[cellDate];
  let dayRecords;

  if (isExist) {
    dayRecords = yasumiRecords[cellDate];
  }

  return (
    <Box style={{ margin: 'auto 0 auto 0', width: '100%' }}>
      <DayHeader {...{ dayNumberText }} />
      <Box sx={{ height: 60 }}>
        {isExist && (<DayContent {...{ dayRecords }} />)}
      </Box>
    </Box>
  );
};

export default DayCell;
