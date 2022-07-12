import {sidebarClassName} from '../constantDefinition';

/**
 * サイドバー(コメント・変更履歴欄)を隠す
 */
const sidebarHide = () => {
  sidebarClassName.map((item) => {
    (document.getElementsByClassName(item)[0] as HTMLElement).style.display = 'none';
  });
};

export default sidebarHide;