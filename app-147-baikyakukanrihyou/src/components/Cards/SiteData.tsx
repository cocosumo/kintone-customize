
import Grid from '@mui/material/Grid';
import SiteCard from './SiteCard';
import {groupRecordsByField} from './../../helpers/utils';

interface SiteDataProps {

  records: KintoneTypes.SavedData[]
}

const SiteData = ({records}: SiteDataProps) => {

  const groupBySite = groupRecordsByField(records, '媒体サイト');

  return (
    <Grid
      className="sites-data"
      margin={2}
      container
      spacing={2}
    >{
        Object.entries(groupBySite).map<any>(([site, siteRecords]) => {
          return (
            <SiteCard
              key={site}
              site={site}
              siteRecords={siteRecords}
            />
          );
        })
      }
    </Grid>);
};

export default SiteData;