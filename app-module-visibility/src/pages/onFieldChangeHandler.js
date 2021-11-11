
import {setVisibilityByChangedField} from '../helpers/visibility';

export const onFieldChangeHandler = (event) => {

  setVisibilityByChangedField(event);

  return event;
};