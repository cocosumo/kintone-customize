/* Kintone App API
This combiles desktop and mobile API's
Author: Lorenz Ras
*/

export const onPrintShow = [
  'app.record.print.show',
  'mobile.app.record.print.show',
];

export const getSpaceElement = (spaceId, eventType) => (
  eventType.includes('mobile')
    ? kintone.mobile.app.record.getSpaceElement(spaceId)
    : kintone.app.record.getSpaceElement(spaceId)
);

export const getPrintViewHeader = () => {
  const headerElement = document.getElementsByClassName('print-header-gaia')[0];
  return headerElement;

  /* const rootNode = document.createElement('div');
  rootNode.id = 'rootHeader';

  return headerElement.appendChild(rootNode); */
};
