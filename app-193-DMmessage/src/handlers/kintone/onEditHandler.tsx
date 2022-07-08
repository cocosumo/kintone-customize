import sidebarHide from '../../helpers/sidebarHide';
import gettingUrl from '../gettingUrl';

const onEditHandler = (event : IEvent) => {
  console.log('onEdit Test');

  // サイドバー(コメント・変更履歴)を非表示にする
  sidebarHide();
  gettingUrl(event);

  return event;
};

export default onEditHandler;