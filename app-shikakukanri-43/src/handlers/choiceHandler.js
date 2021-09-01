import { setFieldShown } from '../../../kintone-api/api';

const choiceHandler = (event) => {
  const { record } = event;
  const {
    qualificationChoices: qC,
    qualificationsName: qN,
  } = record;

  const isOthers = qC.value === 'その他';

  qN.value = isOthers ? '' : qC.value;
  qN.disabled = !isOthers;
  setFieldShown('qualificationsName', isOthers);

  return event;
};

export default choiceHandler;
