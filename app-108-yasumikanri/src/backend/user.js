import { fetchEmployeeById } from '../../../kintone-api/fetchRecords';

export const getUserInfo = () => kintone.getLoginUser();

export const getUserCode = () => kintone.getLoginUser().code;

export const getOrganization = async () => (await kintone.api(kintone.api.url('/v1/user/organizations', true), 'GET', { code: getUserCode() }))
  .organizationTitles[0]
  ?.title
  ?.name;

export const isAdministrator = async () => {
  const org = await getOrganization() || '無';
  console.log(`Welcome ${org}`);
  return await org === 'Administrator';
};

export const getEmployeeNumber = () => getUserInfo().employeeNumber;

export const getEmployeeRole = async () => (
  await fetchEmployeeById(getEmployeeNumber())
).record.役職.value;
