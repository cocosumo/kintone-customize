import { Box } from '@material-ui/core';
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
      {isExist && (<DayContent {...{ dayRecords }} />)}
      {!isExist && (<Box sx={{ minHeight: '60px' }} />)}
    </Box>
  );
};

export default DayCell;
