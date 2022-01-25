
// import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
// import CardContent from '@mui/material/CardContent';
import BGNews from './../../assets/topbar_news.png';
import BGEvents from './../../assets/topbar_events.png';
import {NewsOrEvent, TitledContainer} from './Props.type';

import Chip from '@mui/material/Chip';
import MUIAccordion from '@mui/material/Accordion';
import MUIAccordionSummary from '@mui/material/AccordionSummary';
import MUIAccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Stack, Typography} from '@mui/material';

import {useState} from 'react';
import './AccordionContainer.css';

interface HeaderImage {
  headerImage : string,
  title: NewsOrEvent,
  subTitle: string,
  dataCount?: string
}

const HeaderAccordionWithBG = ({headerImage, title, subTitle, dataCount} : HeaderImage) => {
  return (
    <MUIAccordionSummary
      expandIcon={<ExpandMoreIcon fontSize="large" />}
      sx={{overflow: 'hidden',
        backgroundImage: `url(${headerImage})`,
        backgroundSize: '110% auto',
        backgroundPosition: 'center'
      }}
    >
      {dataCount && <Chip className="announcement_count" color="default" size="small" label={`${dataCount}件`} />}

      <Stack direction="row" spacing={2} width="100%" alignItems="center" justifyContent="center">
        <Typography
          component="div"
          className="announce_title"
          variant="h4"
          gutterBottom={false}
        >
          {title}
        </Typography>
        <Typography className="announce_subtitle" component="div" gutterBottom={false}>{subTitle}</Typography>
      </Stack>
    </MUIAccordionSummary>
  );
};

export const AccordionContainer = ({title, subTitle, dataCount, children} : TitledContainer) => {
  const [expanded, setExpanded] = useState(false);

  const isNews = title === 'NEWS';
  const headerImage : string = isNews ? BGNews : BGEvents;

  return (
    <Grid item md={6} xs={12} px={2} pb={1} >
      <MUIAccordion expanded={expanded} onChange={()=> setExpanded(!expanded)}>
        <HeaderAccordionWithBG {...{headerImage, title, subTitle, dataCount}} />
        <MUIAccordionDetails>
          {children}
        </MUIAccordionDetails>
      </MUIAccordion>
    </Grid>
  );
};

AccordionContainer.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  children: PropTypes.node
};