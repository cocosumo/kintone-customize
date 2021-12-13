import {getAppId} from '@yumetetsu/library';

export const ProductionAppId = 91;
export const INDEX_RESERVATION_STATUS = getAppId() === ProductionAppId ? 5533779 : 5533776;

console.log(getAppId(), 'appId');