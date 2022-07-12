import sidebarHide from '../../helpers/sidebarHide';
// import gettingUrl from '../gettingUrl';
// import {previewSpaceID} from '../..';
// import TestComponent from '../../components/TestComponent';
// import {createRoot} from 'react-dom/client';
import {renderReactPreview} from '../gettingUrl';

const onEditHandler = (event : IEvent) => {
  console.log('onEdit Test');

  sidebarHide(); // サイドバー(コメント・変更履歴)を非表示にする
  renderReactPreview(); // スペースフィールドにプレビューHTMLを設置する

  return event;
};

export default onEditHandler;