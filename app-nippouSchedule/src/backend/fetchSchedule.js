import { getAppId, getUserName } from '../../../kintone-api/api';

const fetchSchedules = (condition) => {
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

export const fetchOnDate = (selectedDate) => fetchSchedules(
  `reportDate = "${selectedDate}" `,
);

export const fetchPlanOnDate = async (selectedDate) => (fetchSchedules(
  `plansDate = "${selectedDate}" and creator="${getUserName()}" limit 1`,
));

export const fetchReportOnDate = async (selectedDate) => (fetchSchedules(
  `reportDate = "${selectedDate}" and creator="${getUserName()}" limit 1`,
));

export const isSchedExist = (selectedDate) => (
  fetchReportOnDate(selectedDate)
);

/* export const fetchScheduleOnDate = (carNumber, start, end, recordId) => fetchReservations(
  `$id!="${recordId}" and 号車="${carNumber}" and 開始 <= "${end}" and 終了 >= "${start}" `,
); */

export default fetchSchedules;
