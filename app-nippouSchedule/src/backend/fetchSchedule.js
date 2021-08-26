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

export const fetchOnDate = (selectedDate) => fetchSchedules(
  `reportDate = "${selectedDate}" `,
);

export const fetchSchedOnDateAndPlan = async (selectedDate, type) => (await fetchSchedules(
  `reportDate = "${selectedDate}" and scheduleType like "${type}" limit 1`,
)).records[0];

export const fetchSchedPlanOnDate = (selectedDate) => fetchSchedOnDateAndPlan(selectedDate, '予定');

export const isSchedExist = (selectedDate, type) => (
  fetchSchedOnDateAndPlan(selectedDate, type)
);

/* export const fetchScheduleOnDate = (carNumber, start, end, recordId) => fetchReservations(
  `$id!="${recordId}" and 号車="${carNumber}" and 開始 <= "${end}" and 終了 >= "${start}" `,
); */

export default fetchSchedules;
