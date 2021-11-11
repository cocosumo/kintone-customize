import {getChangedFieldDetails} from '../helpers/utilities';
import {setVisibilityByChangedField} from '../helpers/visibility';

export const onFieldChangeHandler = (event) => {

  setVisibilityByChangedField(getChangedFieldDetails(event));

  return event;
};