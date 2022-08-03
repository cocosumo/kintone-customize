import {Grid} from '@mui/material';
import '../index.css';
import PreviewCard from './PreviewCard';
import TextMultiline from './subComponents/TextMultiline';

interface Props {
  mailObj: MailObj,
}

const MailArea = ({mailObj}: Props) => {
  console.log('urlinput');

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={1}
      margin="16px"
    >
      <Grid item xs={12} md={6}>
        <TextMultiline
          Sentence={mailObj.mailMain}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <PreviewCard
          html={mailObj.mailMain}
        />
      </Grid>
    </Grid>
  );
};

export default MailArea;