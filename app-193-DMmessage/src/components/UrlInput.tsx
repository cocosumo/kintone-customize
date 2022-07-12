import {Grid} from '@mui/material';
import '../index.css';
import ButtonSpc from './subComponents/ButtonSpc';
import InfoLabel from './subComponents/InfoLabel';
import TextSingle from './subComponents/TextSingle';

const UrlInput = () => {
  console.log('urlinput');
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item xs={12} md={12} />
      <Grid item xs={12} md={12}>
        <InfoLabel Sentence="GitHubからメール本文のHTMLソースを取得する" />
      </Grid>
      <Grid item xs={12} md={12}>
        <TextSingle Sentence="URL(GitHub)" />
      </Grid>
      <Grid item xs={12} md={12}>
        <ButtonSpc Sentence="メール本文を取得" />
        <ButtonSpc Sentence="クリア" />
      </Grid>
    </Grid>
  );
};

export default UrlInput;