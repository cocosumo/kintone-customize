/**
 * サイドバー(コメント・変更履歴欄)を隠す
 */
const sidebarHide = () => {
  const sidebar1 = document
    .getElementsByClassName('gaia-argoui-app-show-sidebar-dragged')[0] as HTMLElement;
  const sidebar2 = document
    .getElementsByClassName('gaia-argoui-app-show-sidebar-dragger')[0] as HTMLElement;
  sidebar1.style.display = 'none';
  sidebar2.style.display = 'none';
};

export default sidebarHide;