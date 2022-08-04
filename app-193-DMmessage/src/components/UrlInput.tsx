import axios from 'axios';
import extractText from '../helpers/extractText';
import {Grid} from '@mui/material';
import {SetStateAction} from 'react';
import '../index.css';
import ButtonSpc from './subComponents/ButtonSpc';
import InfoLabel from './subComponents/InfoLabel';
import TextSingle from './subComponents/TextSingle';

interface Props {
  mailObj: MailObj,
  setMailObj: React.Dispatch<SetStateAction<MailObj>>,
}

/**
 * URLの入力エリアと各種ボタンを表示する
 * @param param0 mailObj, setMailObj
 * @returns URLの入力エリアと各種ボタン
 */
const UrlInput = ({mailObj, setMailObj}: Props) => {
  // console.log('urlinput');

  const urlChange = (e: any) => {
    // console.log('urlChange', e.target.value);
    let url = e.target.value;
    if (url.includes('raw')) {
      // urlをそのまま使用する
    } else { // urlを変換する
      url = url.replace('github.com', 'raw.githubusercontent.com');
      url = url.replace('blob/', '');
    }
    const record = kintone.app.record.get();
    record.record.urlBackup.value = url;
    kintone.app.record.set(record);

    setMailObj((prev: MailObj) => {
      return {
        ...prev,
        mailUrl: url
      };
    });
  };

  const getBtnClick = async () => {
    // console.log('getBtnClick');
    // buttonMotion相当の処理を追加する
    const url = mailObj.mailUrl ?? '';
    let mailContent = mailObj.mailMain ?? '';
    if (url === '') { // URLが空の時
      alert('URLを入力してください');
    } else { // URLが入力されているとき
      // urlの内容(=メール本文)を取得する
      mailContent = await axios.get(url).then(res => res.data) as string;
      mailContent = extractText(mailContent);
      // 更新処理(onclick内だと、kintone.events.onとは別メモリのため、get/set使用可)
      const record = kintone.app.record.get();
      record.record.mail_main.value = mailContent;
      record.record.urlBackup.value = url;
      kintone.app.record.set(record);
    }
    setMailObj((prev: MailObj) => {
      return {
        ...prev,
        mailMain: mailContent
      };
    });
  };

  const clrBtnClick = () => {
    // console.log('clrBtnClick');
    // [クリア]ボタンが押されたときの処理
    const record = kintone.app.record.get();
    record.record.mail_main.value = '';
    record.record.urlBackup.value = '';
    kintone.app.record.set(record);
    setMailObj((prev: MailObj) => {
      return {
        ...prev,
        mailMain: '',
        mailUrl: ''
      };
    });
  };

  // console.log('mailObj', mailObj);

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={1}
      margin="0px 0px 0px 16px"
    >
      <Grid item xs={12} md={12}>
        <InfoLabel Sentence="GitHubからメール本文のHTMLソースを取得する" />
      </Grid>
      <Grid item xs={12} md={12}>
        <TextSingle
          label="URL(GitHub)"
          value={mailObj.mailUrl}
          OnChangeFunc={urlChange}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <ButtonSpc
          Sentence="メール本文を取得"
          onClick={getBtnClick}
        />
        <ButtonSpc
          Sentence="クリア"
          onClick={clrBtnClick}
        />
      </Grid>
    </Grid>
  );
};

export default UrlInput;