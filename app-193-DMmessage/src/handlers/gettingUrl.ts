import buttonMotion from '../helpers/buttonMotion';
import createPreview from '../helpers/createPreview';
import {buttonSetting, urlSetting} from '../helpers/elementSetting';
import urlClear from '../helpers/urlClear';
import './gettingUrl.css';
import {setFieldShown} from '../../../kintone-api/api';

const gettingUrl = (event: IEvent) => {
  // URLのバックアップフィールドを非表示にする
  setFieldShown('urlBackup', false);

  // URL入力エリアを設置する
  const urlInput = urlSetting(event);
  const getbtn = buttonSetting('メール本文を取得', 'urlArea', 'mailGet');
  const clrbtn = buttonSetting('クリア', 'urlArea', 'urlClear');

  // プレビューボタンを設置する
  const previewbtn = buttonSetting('プレビューを表示する', 'previewBtn', 'showPreview');

  buttonMotion(getbtn, urlInput); // URLからメール本文を取得
  urlClear(clrbtn, urlInput);
  createPreview(previewbtn);

  return event;
};

export default gettingUrl;