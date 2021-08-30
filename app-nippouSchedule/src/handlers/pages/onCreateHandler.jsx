import { adjustByDays } from '../../helpers/Time';

const onCreateHandler = async ({ record }) => {
  const { reportDate, plansDate } = record;
  plansDate.value = adjustByDays(reportDate.value, 1);
};

export default onCreateHandler;
