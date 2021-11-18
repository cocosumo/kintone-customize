import {getChangedFieldDetails} from '../helpers/utilities';
import {setVisibilityByChangedField} from '../helpers/visibility';

export const onFieldChangeHandler = (event) => {

  console.log('フィールド変更時のevent', event);
  setVisibilityByChangedField(getChangedFieldDetails(event));

  return event;
};