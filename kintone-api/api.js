/* Kintone App API
This combines desktop and mobile API's
Author: Lorenz Ras
*/

export const onPrintShow = [
  'app.record.print.show',
  'mobile.app.record.print.show',
];

export const onIndexShow = [
  'app.record.index.show',
  'mobile.app.record.index.show',
];

/* Record View */
export const getSpaceElement = (spaceId, eventType) => (
  eventType.includes('mobile')
    ? kintone.mobile.app.record.getSpaceElement(spaceId)
    : kintone.app.record.getSpaceElement(spaceId));

/* List View */
export const getHeaderMenuSpaceElement = (eventType) => (
  eventType.includes('mobile')
    ? kintone.mobile.app.getHeaderMenuSpaceElement()
    : kintone.app.getHeaderMenuSpaceElement()
);

export const getPrintViewHeader = () => {
  const headerElement = document.getElementsByClassName('print-header-gaia')[0];
  return headerElement;

  /* const rootNode = document.createElement('div');
  rootNode.id = 'rootHeader';

  return headerElement.appendChild(rootNode); */
};
