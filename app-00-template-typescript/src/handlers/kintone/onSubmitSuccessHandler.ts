interface KintoneEvent {
  record : kintone.types.SavedFields;
}

const onSubmitSuccessHandler = (event : KintoneEvent) => {
  // const {record: {title}} = event;

  event.record.title.value = 'hello';

  return event;
};

export default onSubmitSuccessHandler;
