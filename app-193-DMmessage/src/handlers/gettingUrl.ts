import buttonMotion from '../helpers/buttonMotion';
import createPreview from '../helpers/createPreview';
import {buttonSetting, urlSetting} from '../helpers/elementSetting';
import urlClear from '../helpers/urlClear';

const gettingUrl = (event: kintone.types.SavedAppFields) => {
  const urlInput = urlSetting(); // URL入力エリアの設置
  const getbtn = buttonSetting('メール本文を取得'); // ボタンの設置
  const clrbtn = buttonSetting('クリア'); // ボタンの設置
  const previewbtn = buttonSetting('プレビューを表示する'); // ボタンの設置

  buttonMotion(getbtn, urlInput); // URLからメール本文を取得
  urlClear(clrbtn, urlInput);
  createPreview(previewbtn);

  return event;
};

export default gettingUrl;