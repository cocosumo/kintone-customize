import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MUIAccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import {fromISOToFullDate} from '../../helpers/time';
import affiliateColors from './affiliationColors.json';
import Chip from '@mui/material/Chip';

interface AccordionHeaderProps {
  title : string,
  affiliate: string
  startDate: string
}


export const AccordionHeader = ({title, affiliate, startDate} : AccordionHeaderProps) => {

  const {bgcolor} = affiliateColors[affiliate as keyof typeof affiliateColors];
  const gradientColor = `linear-gradient(12deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 63%, ${bgcolor} 100%)`;

  return (
    <MUIAccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
      sx={{
        background: gradientColor,
        color: '#696969'
      }}
    >

      <Stack spacing={1}>

        <Stack direction="row" spacing={2}>
          <Chip
            title={affiliate}
            label={affiliate}
            size="small"
            sx={{bgcolor: bgcolor, color: '#808080'}}
          />
          <Typography variant="caption">
            {fromISOToFullDate(startDate)}
          </Typography>
        </Stack>

        <Typography variant="body1" fontWeight={600}>
          {title}
        </Typography>

      </Stack>

    </MUIAccordionSummary>
  );
};

export default AccordionHeader;