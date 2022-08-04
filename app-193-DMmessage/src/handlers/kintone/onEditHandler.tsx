import gettingDM from '../gettingDM';
import sidebarHide from '../../helpers/sidebarHide';

/**
 * レコードの編集画面の処理
 * @param event kintoneアプリのフィールド
 * @returns kintoneアプリのフィールド
 */
const onEditHandler = (event : IEvent) => {
  // console.log('onEdit Test');

  sidebarHide(); // サイドバー(コメント・変更履歴)を非表示にする
  gettingDM(event);

  return event;
};

export default onEditHandler;