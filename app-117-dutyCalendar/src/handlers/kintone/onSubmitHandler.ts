import usersToString from '../../helpers/kintone';

interface KintoneEvent {
  record : kintone.types.SavedFields;
}

const onSubmitHandler = (event : KintoneEvent) => {
  const {record: {title, toDo, onDuty}} = event;

  title.value = ` : ${usersToString(onDuty)}(${toDo.value})`;

  console.log(onDuty.value);

  return event;
};

export default onSubmitHandler;
