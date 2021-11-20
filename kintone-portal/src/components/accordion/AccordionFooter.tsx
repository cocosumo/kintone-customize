import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import AttachmentIcon from '@mui/icons-material/Attachment';
import AccordionActions from '@mui/material/AccordionActions';
import {goToRecordPath} from '../../../../kintone-api/typescript/typedAPI';
import {fetchURLByFileKey, getAnnoucementsAppId} from './../../backend/announcement';
import {getDomain} from '../../../utils';
import {useState} from 'react';
import PDFViewer from '../viewers/PDFViewer';
import ImageViewer from '../viewers/ImageViewer';
// import PDFViewer2 from '../viewers/PDFViewer2';


const openRecord = (recordId: kintone.fieldTypes.Id) : void => {
  goToRecordPath({
    recordId: recordId.value,
    appId: getAnnoucementsAppId(),
    domain: getDomain()
  });
};


const AttachmentChip = ({name, fileKey, openPDFViewerHandler} : AttachmentChip) => {

  return (
    <Grid item xs="auto">
      <Chip
        icon={<AttachmentIcon />}
        label={name}
        onClick={() => {
          openPDFViewerHandler(fileKey);
        }}
      />
    </Grid>
  );
};

const AccordionFooter = ({attachment, $id} : AccordionFooterProps) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState({URL: '', type: '', size: 0});

  const openPDFViewerHandler = (fileKey : string) => {
    setIsModalOpen(true);
    fetchURLByFileKey(fileKey).then((resp) => {
      setFile({...resp});
    });
  };

  const isPDF = file.type.includes('pdf');

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
              return <AttachmentChip key={name} {...{name, fileKey, openPDFViewerHandler}} />;
            })}
        </Grid>
        <div>
          <Button variant="contained" onClick={()=>openRecord($id)}>本文を見る</Button>
        </div>
      </Stack>
      {isPDF && <PDFViewer {...{isModalOpen, setIsModalOpen}} url={file.URL} />}
      {!isPDF && <ImageViewer {...{isModalOpen, setIsModalOpen}} url={file.URL} />}
    </AccordionActions >
  );
};

export default AccordionFooter;