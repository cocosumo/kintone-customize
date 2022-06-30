import buttonMotion from '../../helpers/buttonMotion';
import {buttonSetting, urlSetting} from '../../helpers/elementSetting';
import './onCreateHandler.css';

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