import {Grid} from '@mui/material';
import {useState} from 'react';
import MailArea from './MailArea';
import UrlInput from './UrlInput';

const SpaceComponent = () => {
  const [mailObj, setMailObj] = useState<MailObj>({
    mailUrl: '',
    mailMain: ''
  });

  return (
    <Grid container spacing={2}>
      <UrlInput
        mailObj={mailObj}
        setMailObj={setMailObj}
      />
      <MailArea
        mailObj={mailObj}
      />
    </Grid>
  );
};

export default SpaceComponent;