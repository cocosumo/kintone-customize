const getLeaveInClickedDate = (record) => record?.find(({ type }) => type.includes('leave'));

export default getLeaveInClickedDate;
