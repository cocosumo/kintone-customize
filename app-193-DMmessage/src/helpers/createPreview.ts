import './createPreview.css';
import displayChange from './displayChange';

/**
 * プレビューボタンが押されたら、モーダルウィンドウにプレビューを表示する
 * @param btn HTMLButtonElement: プレビューボタン
 */
const createPreview = (
  btn: HTMLButtonElement,
) => {
  // btn.onclick = async () => {
  // モーダルウィンドウにプレビューを表示する
  // スペースフィールド：previewの取得
  const modal = kintone.app.record.getSpaceElement('forDebag') as HTMLElement;
  modal.classList.add('modal');
  displayChange(modal, false);
  const modalContent = document.createElement('div');
  modalContent.id = 'modal';

  // モーダルのヘッダを作成する
  const head = document.createElement('div');
  head.className = 'modal-header';
  head.innerHTML = `<p class="modalTitle">メール本文のプレビュー</p>
  <span class="modalClose">×</span>`;

  // モーダルの内容を設定する
  // const br = document.createElement('br');
  const elem = document.createElement('div');
  elem.id = 'modal-body';
  // console.log('メール本文', elem);

  // スペースフィールドにボタンを設定する
  modalContent.appendChild(head);
  modalContent.appendChild(elem);

  modal.appendChild(modalContent);

  // プレビューボタンが押されたとき
  const modalOpen = () => {
    const record = kintone.app.record.get();
    const mailMain = record.record.mail_main.value;
    elem.innerHTML = mailMain;
    // modal.style.display = 'block';
    displayChange(modal, true);
  };
  btn.addEventListener('click', modalOpen);

  const buttonClose = document.getElementsByClassName('modalClose')[0];

  // バツ印がクリックされた時
  const modalClose = () => {
    // modal.style.display = 'none';
    displayChange(modal, false);
  };
  buttonClose.addEventListener('click', modalClose);


  // モーダルコンテンツ以外がクリックされた時
  const outsideClose = (e: any) => {
    if (e.target === modal) {
      // modal.style.display = 'none';
      displayChange(modal, false);
    }
  };
  addEventListener('click', outsideClose);
  // };

};

export default createPreview;