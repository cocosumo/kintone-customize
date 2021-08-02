import sendResultToChatWork from '../actions/sendResultToChatWork';

const onEditOrCreateSubmitSuccessHandler = (event) => {
  sendResultToChatWork(event);
};

export default onEditOrCreateSubmitSuccessHandler;
