import {recalculateAll} from '../../helpers/calculate';

const onRecalculateHandler = (event : SaveFields) => {

  recalculateAll(event.record);

  return event;
};

export default onRecalculateHandler;