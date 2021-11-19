import {setVisibility} from './../../../app-module-visibility/src/helpers/visibility';
import visibilitySettings from './../helpers/visibilitySettings.json';

export const onFieldChangeHandler = (event) => {

  setVisibility(event, visibilitySettings);

  return event;
};