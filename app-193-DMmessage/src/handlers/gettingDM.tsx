import {setFieldShown} from '../../../kintone-api/api'; // isMobile
import {renderReactPreview} from './reactRender';

const gettingDM = (event: IEvent) => {
  // バックアップフィールドを非表示にする
  setFieldShown('mail_title', false);
  setFieldShown('urlBackup', false);
  setFieldShown('mail_main', false);

  renderReactPreview(event); // スペースフィールドにプレビューHTMLを設置する
};

export default gettingDM;