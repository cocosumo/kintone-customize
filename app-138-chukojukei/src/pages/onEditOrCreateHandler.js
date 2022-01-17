import {setVisibility} from '../../../app-module-visibility/src/helpers/visibility';
import fieldsWithVisibilitySideEffect from '../helpers/visibilitySettings.json';
import {setFieldShown} from '../../../kintone-api/api';

const onEditOrCreateHandler = (event) => {

  setVisibility(event, fieldsWithVisibilitySideEffect);

  // 初回の表示設定
  setFieldShown('_103_08_容積率a', false);
  setFieldShown('_103_02_9_4sub1', false);
  setFieldShown('_103_10_2_1sub1', false);
  setFieldShown('_103_10_3_1sub2', false);
  for (let i = 1; i <= 6; i++) {
    const spaceName = kintone.app.record.getSpaceElement('spc_202_' + i);
    spaceName.parentNode.style.display = 'none';
    console.log('init表示 繰り返しidx=', i, ' スペース名 =', spaceName);
  }

  return event;
};

export default onEditOrCreateHandler;
