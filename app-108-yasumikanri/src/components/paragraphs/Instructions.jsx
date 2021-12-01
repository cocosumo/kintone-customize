import {
  Card, CardContent, Grid,
  Typography,
  Button
} from '@mui/material/';
import OrdinaryAM from '../../assets/day-ordinary-am.png';
import OrdinaryPM from '../../assets/day-ordinary-pm.png';
import Ordinary from '../../assets/day-ordinary.png';
import Blank from '../../assets/blank.png';
import Plus from '../../assets/plus.png';
import TechSupportPNG from '../../assets/techSupport.png';
import {isMobile} from '../../../../kintone-api/api';

const Instructions = () => {
  const rawContent = [
    {title: '一回目', image: Ordinary, desc: '終日休'},
    {title: '二回目', image: OrdinaryAM, desc: '午前休'},
    {title: '三回目', image: OrdinaryPM, desc: '午後休'},
    {title: '四回目', image: Blank, desc: '白紙'}];
  const content = rawContent.map(({title, image, desc}) => (
    <Card sx={{maxWidth: '20%'}} key={title}>
      <CardContent sx={{p: 1}} style={{paddingBottom: 1}}>
        <Typography fontSize={isMobile() ? 10 : 16} align="center" component="div">
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

  const goToTop = () => {
    window.scrollTo(0, 0);
  };

  const PlusImage = () => (
    <Button onClick={goToTop}>
      <img
        style={{
          width: '50px',
        }}
        src={Plus}
        alt="title"
      />
    </Button>
  );

  const gotoSupport = () => {
    window.open('https://rdmuhwtt6gx7.cybozu.com/k/101/', '_blank');
  };

  const TechSupport = () => (
    <Button onClick={gotoSupport}>
      <img
        width={50}
        src={TechSupportPNG}
        alt="title"
      />
    </Button>
  );

  return (
    <Card sx={{mt: 4, minWidth: 275}}>
      <CardContent>
        <Typography id="helpSection" align="center" sx={{fontSize: 16}} color="text.secondary" gutterBottom>
          使い方
        </Typography>
        <Typography marginBottom={2} variant="h5" align="center" component="div">
          休みの日付をクリックしてください。
          <br />
          クリックを何度かすると内容が変わります。
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          marginBottom={2}
        >
          {content}
        </Grid>
        <Grid
          container
          direction="column"
          alignItems="center"
        >
          <Typography align="center" sx={{fontSize: 16}} gutterBottom>
            有休、特別有休（アニバーサリー休暇）などを使用する場合は、
            <br />
            右側の
            <PlusImage />
            より新規申請をしてください。
          </Typography>
          <Typography align="center" sx={{mt: 2, fontSize: 16}} gutterBottom>
            ※作成、保存後、「有休を申請する」より「実行」をクリックしてください。
          </Typography>
          <Typography align="center" sx={{mt: 2, fontSize: 16}} gutterBottom>
            エラーや案などございましたら、
            <TechSupport />
            アプリよりご連絡ください。
            よろしくお願いいたします。
          </Typography>

        </Grid>
      </CardContent>

    </Card>
  );
};

export default Instructions;
