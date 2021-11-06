
import {Typography} from '@mui/material';
import MUIAccordionDetails from '@mui/material/AccordionDetails';

interface AccordionContentsProps {
  contents : string
}

const AccordionContents = ({contents} : AccordionContentsProps) => {
  return (
    <MUIAccordionDetails>
      <Typography>
        <span dangerouslySetInnerHTML={{__html: contents}} />
      </Typography>
    </MUIAccordionDetails>
  );
};

export default AccordionContents;