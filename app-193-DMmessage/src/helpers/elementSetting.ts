import {previewSpaceID} from '..';

/**
 * スペースフィールドに、URLの入力エリアを設置する
 */
export const urlSetting = (event: {
  record :kintone.types.SavedAppFields
}) => {
  // スペースフィールド：previewの取得
  const space = kintone.app.record.getSpaceElement(previewSpaceID) as HTMLElement;
  space.classList.add('m-2.5');

  // URLの入力エリアを作成する
  const inputExplan = document.createElement('label');
  inputExplan.textContent = 'GitHubからメール本文のHTMLソースを取得する';

  const br = document.createElement('br');

  const inputLabel = document.createElement('label');
  inputLabel.textContent = 'URL(GitHub)';
  inputLabel.classList.add('urlLabel');

  const inputArea = document.createElement('input');
  inputArea.classList.add('w-4/5');
  inputArea.value = event.record.urlBackup.value ?? '';


  const elem = document.createElement('div');
  elem.id = 'urlInput';
  elem.appendChild(inputLabel);
  elem.appendChild(inputArea);

  // スペースフィールドにボタンを設定する
  space.appendChild(inputExplan);
  space.appendChild(br);
  space.appendChild(elem);

  return inputArea;
};

/**
 * スペースフィールドに、ボタンを設置する
 * @param btnstr ボタンに表示するテキスト
 * @returns ボタンエレメント
 */
export const buttonSetting = (
  btnstr: string,
  spaceName: string,
  className: string,
) => {
  // スペースフィールド：buttonAreaの取得
  const space = kintone.app.record.getSpaceElement(spaceName) as HTMLElement;
  space.classList.add(className);

  // 取得ボタンを作成する
  const btn = document.createElement('button');
  btn.textContent = btnstr;

  // スペースフィールドにボタンを設定する
  space.appendChild(btn);

  return btn;
};
