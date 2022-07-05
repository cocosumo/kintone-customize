import {isMobile, setFieldShown} from '../../../../kintone-api/api';
import createPreview from '../../helpers/createPreview';
import './onDetailHandler.css';

const getHeaderMenuSpaceElement = () => (
  isMobile()
    ? kintone.mobile.app.getHeaderSpaceElement()
    : kintone.app.record.getHeaderMenuSpaceElement()
);

/**
 * 「レコードの詳細画面」の処理
 * @param event kintoneアプリのフィールド
 * @returns kintoneアプリのフィールド
 */
const onDetailHandler = (event: kintone.types.SavedAppFields) => {
  console.log('onDetail Test');

  // URLのバックアップフィールドを非表示にする
  setFieldShown('urlBackup', false);

  // プレビューボタンを作成する
  const btn = document.createElement('button');
  btn.textContent = 'メール本文をプレビュー';

  // ヘッダースペースにボタンを設定する
  getHeaderMenuSpaceElement()?.appendChild(btn);
  getHeaderMenuSpaceElement()?.classList.add('detailPreview');

  // モーダルの作成
  createPreview(btn);

  return event;
};

export default onDetailHandler;