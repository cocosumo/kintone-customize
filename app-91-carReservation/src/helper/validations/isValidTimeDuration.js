import {DateTime} from 'luxon';

const dt = DateTime;

const isValidTimeDuration = (start, end) => {

  return dt.fromISO(start) < dt.fromISO(end);
};


export const showEmptyError = (field, error = '入力してください')=> {
  console.log(field, 'field');
  field.error = field.value ? '' : error;
};

export default isValidTimeDuration;
