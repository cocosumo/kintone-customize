import {Grid} from '@mui/material';
import MailArea from './MailArea';
import UrlInput from './UrlInput';

const SpaceComponent = () => {
  return (
    <Grid container spacing={2}>
      <UrlInput />
      <MailArea />
    </Grid>
  );
};

export default SpaceComponent;