export const getUserInfo = () => kintone.getLoginUser();

export const getEmployeeNumber = () => getUserInfo().employeeNumber;
