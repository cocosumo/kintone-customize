import { Box } from '@mui/material';
import TypeIcon from './TypeIcon';

const DayContent = ({ dayRecords }) => (
  <Box sx={{
    textAlign: 'center', pt: 0.2, pb: 0.8, height: '100%',
  }}
  >
    <TypeIcon record={dayRecords[0]} />
  </Box>
);
export default DayContent;
