// import {setFieldShown} from '../../../../kintone-api/api'; // isMobile
// import createPreview from '../../helpers/createPreview';
import sidebarHide from '../../helpers/sidebarHide';
import gettingDM from '../gettingDM';

/* const getHeaderMenuSpaceElement = () => (
  isMobile()
    ? kintone.mobile.app.getHeaderSpaceElement()
    : kintone.app.record.getHeaderMenuSpaceElement()
); */

/**
 * 「レコードの詳細画面」の処理
 * @param event kintoneアプリのフィールド
 * @returns kintoneアプリのフィールド
 */
const onDetailHandler = (event: IEvent) => {
  // console.log('onDetail Test');

  sidebarHide(); // サイドバー(コメント・変更履歴)を非表示にする
  gettingDM(event);

  // バックアップフィールドを非表示にする
  // setFieldShown('urlBackup', false);
  // setFieldShown('mail_main', false);

  // プレビューボタンを作成する
  // const btn = document.createElement('button');
  // btn.textContent = 'メール本文をプレビュー';

  // ヘッダースペースにボタンを設定する
  // getHeaderMenuSpaceElement()?.appendChild(btn);
  // getHeaderMenuSpaceElement()?.classList.add('detailPreview');

  // モーダルの作成
  // createPreview();

  return event;
};

export default onDetailHandler;