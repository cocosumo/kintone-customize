import { getAppId } from '../../../kintone-api/api';

const fetchSchedules = (condition = '') => {
  const body = {
    app: getAppId(),
    query: condition,
  };
  return kintone.api(
    kintone.api.url('/k/v1/records', true),
    'GET',
    body,
  );
};

export const fetchScheduleOnDate = (selectedDate) => fetchSchedules(
  `reportDate <= "${selectedDate}" `,
);
/* export const fetchScheduleOnDate = (carNumber, start, end, recordId) => fetchReservations(
  `$id!="${recordId}" and 号車="${carNumber}" and 開始 <= "${end}" and 終了 >= "${start}" `,
); */

export default fetchSchedules;
