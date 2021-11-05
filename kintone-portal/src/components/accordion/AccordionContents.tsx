
import MUIAccordionDetails from '@mui/material/AccordionDetails';

interface AccordionContentsProps {
  contents : string
}

const AccordionContents = ({contents} : AccordionContentsProps) => {
  return (
    <MUIAccordionDetails>
      <div dangerouslySetInnerHTML={{__html: contents}} />

    </MUIAccordionDetails>
  );
};

export default AccordionContents;