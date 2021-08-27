import { getMonthRecords } from '../../backend/fetchRecords';
import { adjustByDays } from '../../helpers/Time';

const onCreateHandler = async ({ record }) => {
  const { reportDate, plansDate } = record;
  plansDate.value = adjustByDays(reportDate.value, 1);
  console.log(await getMonthRecords(reportDate.value));
};

export default onCreateHandler;
