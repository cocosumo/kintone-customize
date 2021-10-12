interface KintoneEvent {
  record : kintone.types.SavedFields;
}

const onSubmitHandler = (event : KintoneEvent) => {
  const {record: {title, toDo, onDuty}} = event;

  title.value = toDo.value;

  console.log(onDuty.value);

  return event;
};

export default onSubmitHandler;
