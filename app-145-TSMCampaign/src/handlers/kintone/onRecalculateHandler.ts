import {recalculateAll} from '../../helpers/calculate';

const onRecalculateHandler = (event : SaveFields) => {

  recalculateAll(event);

  return event;
};

export default onRecalculateHandler;