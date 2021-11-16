import {getChangedFieldDetails} from '../helpers/utilities';
import {setValueByApplyPeriod} from '../helpers/setValues';

export const onFieldChangeHandler = (event) => {

  console.log('フィールド変更時のevent', event);
  setValueByApplyPeriod(getChangedFieldDetails(event));

  return event;
};