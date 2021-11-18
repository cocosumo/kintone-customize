/* Kintone App API
This combines desktop and mobile API's
Author: Yumenootetsudai 社内開発者
*/

export const isMobile = () => (window.location.href).includes('k/m');
export const device = () => (isMobile() ? 'k/m' : 'k');
export const recordPath = (recordId) => (recordId ? `show${isMobile() ? '?' : '#'}record=${recordId}` : '');

export const onDetailShow = [
  'app.record.detail.show',
  'mobile.app.record.detail.show',
];

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

export const onEditOrCreate = onEdit.concat(onCreate);
export const onDetailEditCreate = onDetailShow.concat(onEditOrCreate);
export const onEditOrCreateSubmit = onEditSubmit.concat(onCreateSubmit);
export const onEditOrCreateSubmitSuccess = onEditSubmitSuccess.concat(onCreateSubmitSuccess);

export const onPrintShow = [
  'app.record.print.show',
  'mobile.app.record.print.show',
];

export const onIndexShow = [
  'app.record.index.show',
  'mobile.app.record.index.show',
];

export const onReportShow = [
  'app.report.show',
  'mobile.app.report.show',
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
export const getSpaceElement = (spaceId) => (
  isMobile()
    ? kintone.mobile.app.record.getSpaceElement(spaceId)
    : kintone.app.record.getSpaceElement(spaceId));

/**
 * List View
 * */
export const getHeaderMenuSpaceElement = () => (
  isMobile()
    ? kintone.mobile.app.getHeaderSpaceElement()
    : kintone.app.getHeaderMenuSpaceElement()
);

export const getHeaderSpaceElement = () => (
  isMobile()
    ? kintone.mobile.app.getHeaderSpaceElement()
    : kintone.app.getHeaderSpaceElement()
);

/**
 * Print Viewのヘーダ―
 * */
export const getPrintViewHeader = () => {
  const headerElement = document.getElementsByClassName('print-header-gaia')[0];
  return headerElement;
};

/**
 * アプリのIDを取得
 * */
export const getAppId = () : number => {
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
  if (isMobile()) {
    kintone.mobile.app.record.setFieldShown(fieldCode, isShown);
  } else {
    kintone.app.record.setFieldShown(fieldCode, isShown);
  }
};

/**
 * ユーザー名を取得する
 * */
export const getUserName = () => (kintone.getLoginUser()).name;

/**
 * 現在開いてるレコードデータをJSON形式で取得します。
 * @param appId {int} default = 現在開いているアプリID
 * @param recordId {int} レコード―ID
 * @returns {string} レコードのリンク
 * */
export const kintoneLink = ({appId = getAppId(), recordId}) => {
  const {protocol, hostname} = window.location;
  return `${protocol}//${hostname}/${device()}/${appId}/${recordPath(recordId)}`;
};

/**
 * 現在開いてるレコードデータをJSON形式で取得します。
 * */
export const getFormRecord = () => {
  if (isMobile()) {
    return kintone.mobile.app.record.get();
  }
  return kintone.app.record.get();
};

/**
 * フィールドコードを指定して、レコードに対応するフィールド要素を取得します。
 * */
export const setFormRecord = (formRecord) => {
  if (isMobile()) {
    kintone.mobile.app.record.set(formRecord);
  }
  kintone.app.record.set(formRecord);
};
