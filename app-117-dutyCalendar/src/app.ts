const HANDLE_EVENT = 'app.record.create.show';

interface KintoneEvent {
  record : kintone.types.SavedFields;

}
kintone.events.on(HANDLE_EVENT, (event: KintoneEvent) => {
  console.log('hello');
  return event;
});
