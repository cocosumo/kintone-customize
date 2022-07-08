import axios from 'axios';
import extractText from './extractText';

/**
 * ボタンが押された際に、URLからHTMLソースを取得する
 */
const buttonMotion = (
  btn: HTMLButtonElement,
  inputContent: HTMLInputElement,
) => {
  btn.onclick = async () => {
    // URL入力欄の内容を取得
    let url = inputContent.value ?? '';

    // URLの入力内容に応じて処理を実施する
    if (url === '') { // URLが空の時
      alert('URLを入力してください');
    } else { // URLが入力されているとき
      if (url.includes('raw')) {
        // urlをそのまま使用する
      } else { // 入力されたURLがRawの物ではない場合、RawのURLに変換して取得する
        // ex.) https://github.com/Lorenzras/yumetetsu-dm/blob/main/html/DM%E5%A3%B2%E2%91%A5.html
        //   -> https://raw.githubusercontent.com/Lorenzras/yumetetsu-dm/main/html/DM%E5%A3%B2%E2%91%A5.html
        url = url.replace('github.com', 'raw.githubusercontent.com');
        url = url.replace('blob/', '');
      }

      // urlの内容(=メール本文)を取得する
      let mailContent = await axios.get(url).then(res => res.data) as string;

      mailContent = extractText(mailContent);
      // 更新処理(onclick内だと、kintone.events.onとは別メモリのため、get/set使用可)
      const record = kintone.app.record.get();
      record.record.mail_main.value = mailContent;
      record.record.urlBackup.value = url;
      kintone.app.record.set(record);
    }
  };
};

export default buttonMotion;