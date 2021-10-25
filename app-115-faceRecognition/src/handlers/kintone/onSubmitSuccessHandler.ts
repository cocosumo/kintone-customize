interface KintoneEvent {
  record : kintone.types.SavedFields;
}

const onSubmitSuccessHandler = (event : KintoneEvent) => {
  event.record.title.value = 'hello';

  return event;
};

export default onSubmitSuccessHandler;
