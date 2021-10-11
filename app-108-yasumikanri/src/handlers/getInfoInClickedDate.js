export const getLeaveInClickedDate = (record) => record?.find(({ type }) => type.includes('leave'));

export const getOrdinaryInClickedDate = (record) => record?.find(({ type }) => type.includes('ordinary'));

export default getLeaveInClickedDate;
