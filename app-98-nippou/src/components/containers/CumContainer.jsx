import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { isMobile } from '../../../../kintone-api/api';
import InfoContainer from './InfoContainer';

const KintoneContent = ({ title, value }) => (
  <Grid item xs={6} sm={10}>
    <InfoContainer>
      <Typography sx={{ color: 'GrayText', fontSize: 12, textAlign: 'right' }}>
        {title}
      </Typography>
      <Typography variant="h6" sx={{ textAlign: 'right' }}>
        {value}
      </Typography>
    </InfoContainer>
  </Grid>
);

const CumContainer = ({
  field, label, fieldCode, value,
}) => {
  const contents = [<KintoneContent key={`${label}今月累計`} title="今月累計" value={value} />];
  if (isMobile() && fieldCode.includes('hide')) {
    contents.unshift(<KintoneContent key={`${label}`} title={label} value={field.value} />);
  }

  return (
    <Grid
      spacing={1}
      container
      direction="row"
      justifyContent="flex-end"
      alignItems="flex-end"
    >
      {contents}
    </Grid>
  );
};

export default CumContainer;
