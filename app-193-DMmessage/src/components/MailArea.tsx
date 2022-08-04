import {Grid} from '@mui/material';
import {SetStateAction} from 'react';
import '../index.css';
import PreviewCard from './PreviewCard';
import TextMultiline from './subComponents/TextMultiline';

interface Props {
  mailObj: MailObj,
  setMailObj: React.Dispatch<SetStateAction<MailObj>>,
  viewOnly?: boolean,
}

/**
 * メール本文のHTMLソースとプレビュー画面を表示する
 * @param param0
 * @returns
 */
const MailArea = ({mailObj, setMailObj, viewOnly = false}: Props) => {
  // console.log('urlinput');
  const mailContentChange = (e:any) => {
    setMailObj((prev: MailObj) => {
      return {
        ...prev,
        mailMain: e.target.value
      };
    });
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={1}
      margin="8px 0px 0px 16px"
    >
      <Grid item xs={12} md={6}>
        <TextMultiline
          label="メール本文"
          Sentence={mailObj.mailMain}
          viewOnly={viewOnly}
          onChange={mailContentChange}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <PreviewCard
          html={mailObj.mailMain}
        />
      </Grid>
    </Grid>
  );
};

export default MailArea;