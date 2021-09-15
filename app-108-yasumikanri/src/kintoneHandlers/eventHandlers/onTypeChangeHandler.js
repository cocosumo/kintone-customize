import { setFieldShown } from '../../../../kintone-api/api';
import { normType } from '../../helpers/converters';

export const setReasonShown = (record) => {
  const { type } = record;
  const isOrdinaryYasumi = normType[type.value] === 'day-ordinary';
  setFieldShown('reason', !isOrdinaryYasumi);
};

const onTypeChangeHandler = (event) => {
  setReasonShown(event.record);
  console.log('hello');

  return event;
};

export default onTypeChangeHandler;
