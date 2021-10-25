

const usersToString = (users: kintone.fieldTypes.UserSelect) : string => {

  return users.value.map(({name}) => name).join(', ');
};

export default usersToString;