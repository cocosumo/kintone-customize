import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import AttachmentIcon from '@mui/icons-material/Attachment';
import AccordionActions from '@mui/material/AccordionActions';
import {goToRecordPath} from '../../../../kintone-api/typedAPI';
import env from './../../../env.json';
import {getAnnoucementsAppId} from './../../backend/announcement';
// import {getFileByFileKey} from '../../backend/proxyAPI';
import {getFileWithXHR} from '../../helpers/kintone';


const openRecord = (recordId: kintone.fieldTypes.Id) : void => {
  goToRecordPath({
    recordId: recordId.value,
    appId: getAnnoucementsAppId(),
    domain: env.domain
  });
};

const openAttachment = (fileKey : string) => {
  console.log('Trying to open attachment.');
  // getFileByFileKey(fileKey);
  getFileWithXHR(fileKey);
};

const AttachmentChip = ({name, fileKey} : AttachmentChip) => {
  return (
    <Grid item xs="auto">
      <Chip icon={<AttachmentIcon />} label={name} onClick={()=>openAttachment(fileKey)} />
    </Grid>
  );
};

const AccordionFooter = ({attachment, $id} : AccordionFooterProps) => {
  console.log(attachment);
  return (
    <AccordionActions sx={{justifyContent: 'flex-start'}}>
      <Stack spacing={1}>
        <Grid
          container
          justifyContent="flex-start"
          spacing={1}
          direction="row"
        >
          {attachment.value
            .map(({name, fileKey}) => {
              return <AttachmentChip key={name} {...{name, fileKey}} />;
            })}
        </Grid>
        <div>
          <Button variant="contained" onClick={()=>openRecord($id)}>本文を見る</Button>
        </div>
      </Stack>
    </AccordionActions >
  );
};

export default AccordionFooter;