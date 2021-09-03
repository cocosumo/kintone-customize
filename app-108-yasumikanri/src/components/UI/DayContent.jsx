import { Box } from '@material-ui/core';
import TypeIcon from './TypeIcon';

const DayContent = ({ dayRecords }) => (
  <Box sx={{ textAlign: 'center', mt: 1 }}>
    <TypeIcon record={dayRecords[0]} />
  </Box>
);
export default DayContent;
