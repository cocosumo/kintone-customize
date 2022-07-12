import {Grid} from '@mui/material';
import '../index.css';
import PreviewCard from './PreviewCard';
import TextMultiline from './subComponents/TextMultiline';

const MailArea = () => {
  console.log('urlinput');
  const mailMain = '';

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item xs={12} md={12}>
        <TextMultiline Sentence="メール本文" />
      </Grid>
      <Grid item xs={12} md={12}>
        <PreviewCard html={mailMain} />
      </Grid>
    </Grid>
  );
};

export default MailArea;