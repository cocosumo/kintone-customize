import buttonMotion from '../helpers/buttonMotion';
// import createPreview from '../helpers/createPreview';
import {buttonSetting, urlSetting} from '../helpers/elementSetting';
import urlClear from '../helpers/urlClear';
import {setFieldShown} from '../../../kintone-api/api';
import {previewSpaceID} from '..';
import {createRoot} from 'react-dom/client';
import SpaceComponent from '../components/SpaceComponent';

export const renderReactTest = () => {
  const container = kintone.app.record.getSpaceElement(previewSpaceID) as HTMLElement;
  const root = createRoot(container); // createRoot(container!) if you use TypeScript
  root.render(<SpaceComponent />);
  // ReactDOM.render(<TestComponent />, kintone.app.getHeaderSpaceElement());
};

const gettingUrl = (event: IEvent) => {
  // バックアップフィールドを非表示にする
  setFieldShown('urlBackup', false);
  setFieldShown('mail_main', false);

  // URL入力エリアを設置する
  const urlInput = urlSetting(event);
  const getbtn = buttonSetting('メール本文を取得', previewSpaceID, 'mailGet');
  const clrbtn = buttonSetting('クリア', previewSpaceID, 'urlClear');
  console.log('取得ボタン', getbtn);

  // プレビューボタンを設置する
  // const previewbtn = buttonSetting('プレビューを表示する', 'previewBtn', 'showPreview');

  buttonMotion(getbtn, urlInput); // URLからメール本文を取得
  urlClear(clrbtn, urlInput);
  // createPreview();

  return event;
};

export default gettingUrl;