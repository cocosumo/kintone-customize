/* 

Kintone App API 

This combiles desktop and mobile API's 

Author: Lorenz Ras
*/

export const getSpaceElement = (spaceId, eventType) => {
    console.log(spaceId);
    return eventType.includes('mobile') ?
        kintone.mobile.app.record.getSpaceElement(spaceId) :
        kintone.app.record.getSpaceElement(spaceId)
}

export const onPrintShow = [
    'app.record.print.show',
    'mobile.app.record.print.show'
];


