
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import CardContent from '@mui/material/CardContent';
import BGNews from './../../assets/topbar_news_withText.png';
import BGEvents from './../../assets/topbar_events_withText.png';

export const AccordionContainer = ({title, subTitle, children} : TitledContainer) => {

  const headerImage = title === 'NEWS' ? BGNews : BGEvents;

  return (
    <Grid
      item
      xs={12}
      md={6}
      px={2}
      pb={1}
    >
      <Card>
        <Grid
          container
          alignItems="center"
        >
          <img width="100%" src={`${headerImage}`} alt={subTitle} />
        </Grid>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </Grid>

  );
};

AccordionContainer.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  children: PropTypes.node
};