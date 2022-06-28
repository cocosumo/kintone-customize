import './onCreateHandler.css';

/**
 * スペースフィールドに、取得ボタンを設置する
 */
const buttonSetting = () => {
  // スペースフィールドの取得
  const space = kintone.app.record.getSpaceElement('urlArea') as HTMLElement;
  space.classList.add('urlArea');

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
const buttonMotion = (btn : HTMLButtonElement) => {

  // 入力されたURLがRawの物ではない場合、RawのURLに変換して取得する
  // ex.) https://github.com/Lorenzras/yumetetsu-dm/blob/main/html/DM%E5%A3%B2%E2%91%A5.html
  //   -> https://raw.githubusercontent.com/Lorenzras/yumetetsu-dm/main/html/DM%E5%A3%B2%E2%91%A5.html

  btn.onclick = () => {
    alert('プッシュ');
  };
};

/**
 * 「レコードを追加する」際の処理
 * @param event kintoneアプリのフィールド
 * @returns kintoneアプリのフィールド
 */
const onCreateHandler = (event : kintone.types.SavedAppFields) => {
  console.log('onCreate Test');

  const getbtn = buttonSetting();
  buttonMotion(getbtn);

  return event;
};

export default onCreateHandler;