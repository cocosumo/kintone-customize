import {Grid} from '@mui/material';
import {useState} from 'react';
import MailArea from './MailArea';
import TitleInput from './TitleInput';
import UrlInput from './UrlInput';
// import ViewingURL from './ViewingURL';

interface Props {
  event: IEvent
}

const SpaceComponent = ({event}:Props) => {
  // console.log('初期値設定用', event);
  const [mailObj, setMailObj] = useState<MailObj>({
    mailTitle: event.record.mail_title.value,
    mailUrl: event.record.urlBackup.value,
    mailMain: event.record.mail_main.value
  });

  if (event.type.includes('detail')) {
    return (
      <Grid container spacing={2}>
        {/* <TitleInput
          viewOnly
          mailObj={mailObj}
          setMailObj={setMailObj}
        />
        <ViewingURL
          mailObj={mailObj}
        /> */}
        <MailArea
          mailObj={mailObj}
          setMailObj={setMailObj}
          viewOnly
        />
      </Grid>
    );
  }

  // details以外の時(レコード作成、編集)
  return (
    <Grid container spacing={2}>
      <TitleInput
        viewOnly={false}
        mailObj={mailObj}
        setMailObj={setMailObj}
      />
      <UrlInput
        mailObj={mailObj}
        setMailObj={setMailObj}
      />
      <MailArea
        mailObj={mailObj}
        setMailObj={setMailObj}
        viewOnly={false}
      />
    </Grid>
  );
};

export default SpaceComponent;