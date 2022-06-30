/**
 * スペースフィールドに、URLの入力エリアを設置する
 */
export const urlSetting = () => {
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
export const buttonSetting = () => {
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