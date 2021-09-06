import { Typography } from '@mui/material';

const DayHeader = ({ isRenderDate, dayNumberText }) => (

  <Typography sx={{ color: isRenderDate ? '' : '#fafafa' }}>
    {dayNumberText}
  </Typography>
);

export default DayHeader;
