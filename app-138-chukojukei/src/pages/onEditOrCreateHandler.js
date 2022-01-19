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
  for (let i = 1; i <= 6; i++) { // 2-02 売買代金の設定用
    const spaceName = kintone.app.record.getSpaceElement('spc_202_' + i);
    spaceName.parentNode.style.display = 'none';
  }
  for (let j = 1; j <= 6; j++) { // 1-12 .飲用水・電気・ガス等の設定用
    if (j !== 2 && j !== 6) { // 2.電気,6.雨水は配管設定が無い為、飛ばす
      const spaceName = kintone.app.record.getSpaceElement('spc_112_0' + j);
      spaceName.parentNode.style.display = 'none';
    }
  }

  return event;
};

export default onEditOrCreateHandler;
