import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MUIAccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

interface AccordionHeaderProps {
  title : string,
  affiliate: string
  startDate: string
}

export const AccordionHeader = ({title, affiliate, startDate} : AccordionHeaderProps) => {
  return (
    <MUIAccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >

      <Stack>
        <Typography variant="caption">
          {affiliate}
        </Typography>
        <Typography variant="h6" fontWeight={600}>
          {title}
        </Typography>
        <Typography variant="subtitle2">
          {startDate}
        </Typography>
      </Stack>

    </MUIAccordionSummary>
  );
};

export default AccordionHeader;