/**
 * プレビューボタンが押されたら、モーダルウィンドウにプレビューを表示する
 * @param btn HTMLButtonElement: プレビューボタン
 */
const createPreview = (
  btn: HTMLButtonElement,
) => {
  btn.onclick = async () => {
    // モーダルウィンドウにプレビューを表示する
    // スペースフィールド：previewの取得
    const space = kintone.app.record.getSpaceElement('preview') as HTMLElement;
    space.classList.add('preview');

    const inputExplan = document.createElement('label');
    inputExplan.style.border = 'true';
    const br = document.createElement('br');
    const elem = document.createElement('div');
    elem.id = 'preview';
    const record = kintone.app.record.get();
    const mailMain = record.record.mail_main.value;
    elem.innerHTML = mailMain;
    console.log('メール本文', elem);

    inputExplan.textContent = 'メール本文のプレビュー';
    // スペースフィールドにボタンを設定する
    space.appendChild(inputExplan);
    space.appendChild(br);
    space.appendChild(elem);
  };
};

export default createPreview;