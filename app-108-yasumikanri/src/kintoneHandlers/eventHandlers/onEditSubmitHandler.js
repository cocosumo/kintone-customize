import updateStatus from '../../../../kintone-api/updateStatus';
import { isMonthNow, stringToLux } from '../../helpers/time';

const onEditSubmitHandler = async (event) => {
  const { record } = event;
  const { yasumiDate, $id } = record;

  if (isMonthNow(stringToLux(yasumiDate.value))) {
    await updateStatus({ id: $id.value, action: '未申請' });
  }

  return event;
};

export default onEditSubmitHandler;
