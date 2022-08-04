import {Grid} from '@mui/material';
import {SetStateAction} from 'react';
import TextSingle from './subComponents/TextSingle';


interface Props {
  mailObj: MailObj,
  setMailObj: React.Dispatch<SetStateAction<MailObj>>,
  viewOnly: boolean,
}

/**
 * メールタイトルエリアを表示する
 * @param param0 mailObj, setMailObj
 * @returns メールタイトル
 */
const TitleInput = ({mailObj, setMailObj, viewOnly = false}: Props) => {
  const mailTitleChange = (e:any) => {
    const record = kintone.app.record.get();
    record.record.mail_title.value = e.target.value;
    kintone.app.record.set(record);
    setMailObj((prev: MailObj) => {
      return {
        ...prev,
        mailTitle: e.target.value
      };
    });
  };

  // console.log('TitleInput', mailObj);

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={1}
      margin="16px 0px 0px 16px"
    >
      <Grid item xs={12} md={12}>
        <TextSingle
          label="メールタイトル"
          value={mailObj.mailTitle}
          OnChangeFunc={mailTitleChange}
          disabled={viewOnly}
        />
      </Grid>
    </Grid>
  );
};

export default TitleInput;