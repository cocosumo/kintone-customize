const usersToString = (users: kintone.fieldTypes.UserSelect) : string => users.value.map(({ name }) => name).join(', ');

export default usersToString;
