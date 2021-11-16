import {getChangedFieldDetails} from '../helpers/utilities';
import {setValueByApplyPeriod} from '../helpers/setValues';

export const onFieldChangeHandler = (event) => {

  setValueByApplyPeriod(getChangedFieldDetails(event));

  return event;
};