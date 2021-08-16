/* Kintone App API
This combines desktop and mobile API's
Author: Yumenootetsudai 社内開発者
*/

export const onEdit = [
  'app.record.edit.show',
  'mobile.app.record.edit.show',
];

export const onCreate = [
  'app.record.create.show',
  'mobile.app.record.create.show',
];

export const onEditSubmit = [
  'app.record.edit.submit',
  'mobile.app.record.edit.submit',
];

export const onEditSubmitSuccess = [
  'app.record.edit.submit.success',
  'mobile.app.record.edit.submit.success',
];

export const onCreateSubmit = [
  'app.record.create.submit',
  'mobile.app.record.create.submit',
];

export const onCreateSubmitSuccess = [
  'app.record.create.submit.success',
  'mobile.app.record.create.submit.success',
];

export const onEditOrCreateSubmit = onEditSubmit.concat(onCreateSubmit);
export const onEditOrCreateSubmitSuccess = onEditSubmitSuccess.concat(onCreateSubmitSuccess);

export const onEditOrCreate = onEdit.concat(onCreate);

export const onPrintShow = [
  'app.record.print.show',
  'mobile.app.record.print.show',
];

export const onIndexShow = [
  'app.record.index.show',
  'mobile.app.record.index.show',
];

/**
* フィールド値を変化イベント
* @param {string|array} fields フィルドコード
* @returns {array} イベントの配列
*/
export const onFieldChange = (fields) => [].concat(fields).reduce(
  (acc, curr) => acc.concat(
    `app.record.edit.change.${curr}`,
    `mobile.app.record.edit.change.${curr}`,
    `app.record.create.change.${curr}`,
    `mobile.app.record.create.change.${curr}`,
  ), [],
);

/**
 * Record View
 * */
export const getSpaceElement = (spaceId) => {
  const url = window.location.href;
  return url.includes('k/m')
    ? kintone.mobile.app.record.getSpaceElement(spaceId)
    : kintone.app.record.getSpaceElement(spaceId);
};

/**
 * List View
 * */
export const getHeaderMenuSpaceElement = (eventType) => (
  eventType.includes('k/m')
    ? kintone.mobile.app.getHeaderMenuSpaceElement()
    : kintone.app.getHeaderMenuSpaceElement()
);

/**
 * Print View
 * */
export const getPrintViewHeader = () => {
  const headerElement = document.getElementsByClassName('print-header-gaia')[0];
  return headerElement;
};

/**
 * アプリのIDを取得
 * */
export const getAppId = () => {
  const url = window.location.href;
  return url.includes('k/m')
    ? kintone.mobile.app.getId()
    : kintone.app.getId();
};

/**
* 要素を表示・非表示
* @param fieldCode {string} 要素のフィールドコード
* @param isShown {boolean} trueは表示、falseは非表示
*/
export const setFieldShown = (fieldCode, isShown) => {
  const url = window.location.href;
  if (url.includes('k/m')) {
    kintone.mobile.app.record.setFieldShown(fieldCode, isShown);
  } else {
    kintone.app.record.setFieldShown(fieldCode, isShown);
  }
};
