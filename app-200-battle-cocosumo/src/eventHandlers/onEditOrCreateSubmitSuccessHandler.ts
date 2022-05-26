import sendResultToChatWork from '../actions/sendResultToChatWork';

export interface KintoneEvent {
  record: KintoneTypes195.SavedRecord,
  appId: string,
  recordId: string,
  error: string,
}

const onEditOrCreateSubmitSuccessHandler = (event: KintoneEvent) => {

  const {record: {
    担当者: ag
  }} = event;

  console.log(ag);

  const totalPoints = ag.value.reduce((accu, curr) => {
    return accu + +curr.value.percent_1.value;
  }, 0);

  if (totalPoints > 10) {
    alert(totalPoints);
    event.error = '割合の合計を１０にしてください';
  }

  sendResultToChatWork(event);
  return event;
};

export default onEditOrCreateSubmitSuccessHandler;
