import {setVisibility} from '../../../app-module-visibility/src/helpers/visibility';
import fieldsWithVisibilitySideEffect from '../helpers/visibilitySettings.json';
import {setFieldShown} from '../../../kintone-api/api';
import {visibleChecks} from '../helpers/complexityProcess';

const onEditOrCreateHandler = (event) => {

  setVisibility(event, fieldsWithVisibilitySideEffect);
  visibleChecks(event);

  setFieldShown('_103_08_容積率a', false); // フィールド「_103_08_容積率a」を非表示にする

  return event;
};

export default onEditOrCreateHandler;
