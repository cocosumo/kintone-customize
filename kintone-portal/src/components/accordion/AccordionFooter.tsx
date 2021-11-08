import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import AttachmentIcon from '@mui/icons-material/Attachment';
import AccordionActions from '@mui/material/AccordionActions';
import {goToRecordPath} from '../../../../kintone-api/typedAPI';
import {fetchURLByFileKey, getAnnoucementsAppId} from './../../backend/announcement';
import {getDomain} from '../../../utils';
import {useEffect, useState} from 'react';


const openRecord = (recordId: kintone.fieldTypes.Id) : void => {
  goToRecordPath({
    recordId: recordId.value,
    appId: getAnnoucementsAppId(),
    domain: getDomain()
  });
};




const AttachmentChip = ({name, fileKey} : AttachmentChip) => {
  const [fileURL, setFileURL] = useState<string | undefined>('_blank');

  useEffect(()=>{
    fetchURLByFileKey(fileKey).then((resp) => {
      setFileURL(resp);
    })
  }, []);

  return (
    <Grid item xs="auto">
      <Chip
        icon={<AttachmentIcon />}
        label={name}
        onClick={() => {
          window.open(fileURL);
        }}
      />
    </Grid>
  );
};

const AccordionFooter = ({attachment, $id} : AccordionFooterProps) => {

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