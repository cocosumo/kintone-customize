import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MUIAccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import {fromISOToFullDate} from '../../helpers/time';
import affiliateColors from './affiliationColors.json';
import Chip from '@mui/material/Chip';
import AttachmentIcon from '@mui/icons-material/Attachment';

interface AccordionHeaderProps {
  title : string,
  affiliate: string
  startDate: string
  attachment: kintone.fieldTypes.File
}


export const AccordionHeader = ({title, affiliate, startDate, attachment} : AccordionHeaderProps) => {

  const {bgcolor} = affiliateColors[affiliate as keyof typeof affiliateColors];
  const gradientColor = `linear-gradient(12deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 63%, ${bgcolor} 100%)`;
  const attachmentCount = attachment.value.length;
  const isWithAttachment = attachmentCount > 0;

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

          {isWithAttachment &&
          <Chip
            icon={<AttachmentIcon fontSize="small" />}
            title={attachmentCount.toString()}
            label={attachmentCount.toString()}
            size="small"
          />}

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