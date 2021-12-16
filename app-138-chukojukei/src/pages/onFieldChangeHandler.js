
import {setVisibility} from '../../../app-module-visibility/src/helpers/visibility';
import fieldsWithVisibilitySideEffect from '../helpers/visibilitySettings.json';

export const onFieldChangeHandler = (event) => {

  setVisibility(event, fieldsWithVisibilitySideEffect);
  // setVisibilityByChangedField(event);

  return event;
};