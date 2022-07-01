const urlClear = (
  clrbtn: HTMLButtonElement,
  urlInput: HTMLInputElement,
) => {
  clrbtn.onclick = async () => {
    const record = kintone.app.record.get();
    record.record.mail_main.value = '';
    urlInput.value = '';
    kintone.app.record.set(record);
  };
};

export default urlClear;