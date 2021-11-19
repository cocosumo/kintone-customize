

import Grid from '@mui/material/Grid';
import Typhography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import {groupRecordsByField} from '../../helpers/utils';
import './SiteCard.css';

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
      <div className="site-card">
        <Typhography variant="caption" >{site}</Typhography>
        <Divider />

        <Stack mt={1} direction="column">
          {countPerSite}
        </Stack>
      </div>
    </Grid>
  );
};

export default SiteCard;