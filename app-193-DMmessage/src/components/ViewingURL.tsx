import {Grid} from '@mui/material';
import '../index.css';
import InfoLabel from './subComponents/InfoLabel';
import TextSingle from './subComponents/TextSingle';

interface Props {
  mailObj: MailObj,
}

/**
 * レコード詳細画面：URL情報のみ表示する
 * @param param0 mailObj
 * @returns
 */
const ViewingURL = ({mailObj}: Props) => {
  // console.log('ViewingURL');

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={1}
      margin="0px 0px 0px 16px"
    >
      <Grid item xs={12} md={12}>
        <InfoLabel Sentence="GitHubのURL" />
      </Grid>
      <Grid item xs={12} md={12}>
        <TextSingle
          label="URL(GitHub)"
          value={mailObj.mailUrl}
          disabled
        />
      </Grid>
    </Grid>
  );
};

export default ViewingURL;