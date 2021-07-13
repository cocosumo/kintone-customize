import isValidTimeDuration from '../helper/validations/isValidTimeDuration';

const onChangeTimeHandler = (event) => {
  console.log('Changed time.', event);
  const { record } = event;
  const { 開始: start, 終了: end } = record;

  const isValid = isValidTimeDuration(start.value, end.value);

  // validate
  // Display Available Cars
  return event;
};

export default onChangeTimeHandler;
