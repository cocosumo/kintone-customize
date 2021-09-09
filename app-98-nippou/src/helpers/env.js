import { getAppId } from '../../../kintone-api/api';

export const isStaging = false;
export const stagingAppId = 111;

export const getEnvAppId = () => (isStaging ? stagingAppId : getAppId());
