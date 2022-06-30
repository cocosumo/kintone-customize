import axios from 'axios';
import './onCreateHandler.css';

/**
 * スペースフィールドに、URLの入力エリアを設置する
 */
const urlSetting = () => {
  // スペースフィールド：urlAreaの取得
  const space = kintone.app.record.getSpaceElement('urlArea') as HTMLElement;
  space.classList.add('urlArea');

  // URLの入力エリアを作成する
  const inputExplan = document.createElement('label');
  const br = document.createElement('br');
  const inputLabel = document.createElement('label');
  inputLabel.classList.add('urlLabel');
  const inputArea = document.createElement('input');
  inputExplan.textContent = 'GitHubからメール本文のHTMLソースを取得する';
  inputLabel.textContent = 'URL(GitHub)';
  // スペースフィールドにボタンを設定する
  space.appendChild(inputExplan);
  space.appendChild(br);
  space.appendChild(inputLabel);
  space.appendChild(inputArea);

  return inputArea;
};

/**
 * スペースフィールドに、取得ボタンを設置する
 */
const buttonSetting = () => {
  // スペースフィールド：buttonAreaの取得
  const space = kintone.app.record.getSpaceElement('urlArea') as HTMLElement;
  // space.classList.add('buttonArea');

  // 取得ボタンを作成する
  const btn = document.createElement('button');
  btn.textContent = '取得';

  // スペースフィールドにボタンを設定する
  space.appendChild(btn);

  return btn;
};

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
      const mailContent = await axios.get(url).then(res => res.data) as string;

      // 更新処理(onclick内だと、kintone.events.onとは別メモリのため、get/set使用可)
      const record = kintone.app.record.get();
      record.record.mail_main.value = mailContent;
      kintone.app.record.set(record);
    }
  };
};

/**
 * 「レコードを追加する」際の処理
 * @param event kintoneアプリのフィールド
 * @returns kintoneアプリのフィールド
 */
const onCreateHandler = (event: kintone.types.SavedAppFields) => {
  console.log('onCreate Test');

  const urlInput = urlSetting(); // URL入力エリアの設置
  const getbtn = buttonSetting(); // ボタンの設置

  buttonMotion(getbtn, urlInput); // URLからメール本文を取得

  return event;
};

export default onCreateHandler;