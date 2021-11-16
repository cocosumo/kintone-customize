
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typhography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import CardContent from '@mui/material/CardContent';
import {groupRecordsByField} from '../../helpers/utils';

interface SiteCardProps {
  site : string,
  siteRecords : KintoneTypes.SavedData[] | any
}

const SiteCard = ({site, siteRecords} : SiteCardProps) => {

  const groupByStore = groupRecordsByField(siteRecords, '受付店舗');


  const countPerSite = Object.entries<any>(groupByStore).map(([key, value]) => {
    return (
      <Stack
        direction="row"
        key={key}
        justifyContent="space-between"
        spacing={2}
      >
        <span>{key}</span>
        <span>{value.length}件</span>
      </Stack>);
  });


  return (
    <Grid item>
      <Card sx={{minHeight: '140px'}}>
        <CardContent>
          <Typhography variant="h6">{site}</Typhography>
          <Divider />

          <Stack mt={2} direction="column">
            {countPerSite}
          </Stack>


        </CardContent>
      </Card>
    </Grid>
  );
};

export default SiteCard;