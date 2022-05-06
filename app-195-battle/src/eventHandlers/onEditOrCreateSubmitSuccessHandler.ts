import sendResultToChatWork from '../actions/sendResultToChatWork';

export interface KintoneEvent {
  record: KintoneTypes195.SavedRecord,
  appId: string,
  recordId: string,
}

const onEditOrCreateSubmitSuccessHandler = (event: KintoneEvent) => {
  sendResultToChatWork(event);
};

export default onEditOrCreateSubmitSuccessHandler;
