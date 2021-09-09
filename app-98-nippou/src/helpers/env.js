import { getAppId } from '../../../kintone-api/api';

export const isStaging = false;
export const stagingAppId = 111;
export const prodId = 98;

export const getEnvAppId = () => (isStaging ? prodId : getAppId());
