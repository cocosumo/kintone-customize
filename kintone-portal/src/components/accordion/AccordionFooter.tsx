import Button from '@mui/material/Button';
import AccordionActions from '@mui/material/AccordionActions';

interface AccordionFooterProps {
  attachment: kintone.fieldTypes.File
}

const AccordionFooter = ({attachment} : AccordionFooterProps) => {

  console.log(attachment);
  return (
    <AccordionActions >
      <Button />
    </AccordionActions >
  );
};

export default AccordionFooter;