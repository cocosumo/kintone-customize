import {
  Card, CardContent, Grid,
  Typography,
} from '@mui/material/';
import OrdinaryAM from '../../assets/day-ordinary-am.png';
import OrdinaryPM from '../../assets/day-ordinary-pm.png';
import Ordinary from '../../assets/day-ordinary.png';
import Blank from '../../assets/blank.png';

const Instructions = () => {
  const rawContent = [
    { title: '一回目', image: Ordinary, desc: '終日休み' },
    { title: '二回目', image: OrdinaryAM, desc: '午前休' },
    { title: '三回目', image: OrdinaryPM, desc: '午後休' },
    { title: '四回目', image: Blank, desc: '白紙になります' }];
  const content = rawContent.map(({ title, image, desc }) => (
    <Card sx={{ maxWidth: '20%' }} key={title}>
      <CardContent>
        <Typography variant="h6" align="center" component="div">
          {title}
          <img
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
            }}
            src={image}
            alt="title"
          />

        </Typography>
        <Typography variant="subtitle1" align="center">
          {desc}
        </Typography>
      </CardContent>
    </Card>
  ));

  console.log('geesssse');
  return (
    <Card sx={{ mt: 4, minWidth: 275 }}>
      <CardContent>
        <Typography align="center" sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
          使い方
        </Typography>
        <Typography variant="h5" align="center" component="div">
          休みの日付をクリックしてください。
          <br />
          クリックを何度かすると内容が変わります。
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          {content}
        </Grid>
        <Grid
          container
          direction="column"
          alignItems="center"
        >
          <Typography align="center" sx={{ fontSize: 16 }} gutterBottom>
            有休、特別有休（アニバーサリー休暇）などを使用する場合は、右側の「+」より
            新規申請をしてください。
          </Typography>
          <Typography align="center" sx={{ fontSize: 16 }} gutterBottom>
            ※作成、保存後、「有休を申請する」より「実行」をクリックしてください。
          </Typography>
          <Typography align="center" sx={{ fontSize: 16 }} gutterBottom>
            エラーや案などございましたら、【サポートデスク】アプリよりご連絡ください。
            よろしくお願いいたします。
          </Typography>
        </Grid>
      </CardContent>

    </Card>
  );
};

export default Instructions;
