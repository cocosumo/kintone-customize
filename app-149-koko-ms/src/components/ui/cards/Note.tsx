import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import NordicWalkingIcon from '@mui/icons-material/NordicWalking';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import {Stack, Typography, Grid} from '@mui/material';
import {format} from 'date-fns';
interface NoteProps {
  type: string
}

const Icon = ({type}: NoteProps) => {
  switch (type) {
    case 'メール':
      return <EmailIcon />;
    case '電話':
      return <LocalPhoneIcon />;
    case '来店':
      return <NordicWalkingIcon />;
    case '訪問':
      return <TimeToLeaveIcon />;
  }
  return <EmailIcon />;
};

export default function Note({type}:NoteProps) {
  const testDate = format(new Date(), 'M月d日 HH:mm');

  console.log(testDate, 'testDate');
  return (
    <Grid container className="notes_note">
      <Grid container item xs={3} justifyContent="center" ><Icon {...{type}} /></Grid>
      <Grid item xs={9}>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle1">{type}</Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <AccessTimeIcon fontSize="small" /><Typography fontSize={12} color="#BCBBA"> {testDate}</Typography>
            </Stack>
          </Stack>
          <Stack>
            <Typography variant="caption">無論岡田さんを立脚ろそう変化に申しあるがたこういう師範私か意見がという小講義たうたたて、ある十月も私か世の中ところのありから、ネルソンさんののに人のこれ</Typography>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}