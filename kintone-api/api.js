/* Kintone App API
This combines desktop and mobile API's
Author: Lorenz Ras
*/

export const onEdit = [
  'app.record.edit.show',
  'mobile.app.record.edit.show',
];

export const onCreate = [
  'app.record.create.show',
  'mobile.app.create.edit.show',
];

export const onEditOrCreate = onEdit.concat(onCreate);

export const onPrintShow = [
  'app.record.print.show',
  'mobile.app.record.print.show',
];

export const onIndexShow = [
  'app.record.index.show',
  'mobile.app.record.index.show',
];

export const onFieldChange = (fields) => [].concat(fields).reduce(
  (acc, curr) => acc.concat(
    `app.record.edit.change.${curr}`,
    `mobile.app.record.edit.change.${curr}`,
    `app.app.record.create.change.${curr}`,
    `mobile.app.record.create.change.${curr}`,
  ), [],
);

/* Record View */
export const getSpaceElement = (spaceId, eventType) => (
  eventType.includes('mobile')
    ? kintone.mobile.app.record.getSpaceElement(spaceId)
    : kintone.app.record.getSpaceElement(spaceId)
);

/* List View */
export const getHeaderMenuSpaceElement = (eventType) => (
  eventType.includes('mobile')
    ? kintone.mobile.app.getHeaderMenuSpaceElement()
    : kintone.app.getHeaderMenuSpaceElement()
);

/* Print View */
export const getPrintViewHeader = () => {
  const headerElement = document.getElementsByClassName('print-header-gaia')[0];
  return headerElement;
};
