interface KintoneEvent {
  record : kintone.types.SavedFields;
}

const onEditOrCreateHandler = (event : KintoneEvent) => {
  const {record: {title}} = event;

  title.disabled = false;

  return event;
};

export default onEditOrCreateHandler;
