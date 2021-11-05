import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MUIAccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import {fromISOToFullDate} from '../../helpers/time';
import affiliationColors from './affiliationColors.json';

interface AccordionHeaderProps {
  title : string,
  affiliate: string
  startDate: string
}

const getKeyValue = <T extends object, U extends keyof T>(key: U) => (obj: T) =>
  obj[key];

export const AccordionHeader = ({title, affiliate, startDate} : AccordionHeaderProps) => {

  console.log(getKeyValue(affiliate)(affiliationColors));
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
          {fromISOToFullDate(startDate)}
        </Typography>
      </Stack>

    </MUIAccordionSummary>
  );
};

export default AccordionHeader;