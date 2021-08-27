import { getAppId, getUserName } from '../../../kintone-api/api';
import { endOfMonth, startOfMonth } from '../helpers/Time';

const fetchRecords = (condition) => {
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

export const fetchOnDate = (selectedDate) => fetchRecords(
  `reportDate = "${selectedDate}" `,
);

export const fetchPlanOnDate = async (selectedDate) => (fetchRecords(
  `plansDate = "${selectedDate}" and 作成者 in ("${getUserName()}") limit 1`,
));

export const fetchReportOnDate = async (selectedDate) => (fetchRecords(
  `reportDate = "${selectedDate}" and 作成者 in ("${getUserName()}") limit 1`,
));

export const getMonthRecords = (date) => {
  console.log(date);
  return fetchRecords(`作成者 in ("${getUserName()}")
                            and reportDate >= "${startOfMonth(date)}"
                            and reportDate <= "${endOfMonth(date)}"`);
};

/* function getMonthRecords(id, dateSumitted) {
  const endOfMonth = moment(dateSumitted).clone().endOf('month').format('YYYY-MM-DD');
  const startOfMonth = moment(dateSumitted).clone().startOf('month').format('YYYY-MM-DD');

  const query = `${EID_FIELD} = ${id}
                      and ${DATE_SUBMITTED_FIELD} >= "${startOfMonth}"
                      and ${DATE_SUBMITTED_FIELD} <= "${endOfMonth}" `;
  // console.log(query);

  const paramGET = {
    app: APP_ID,
    query,
    // 'totalCount' : true
  };

  return kinto */

/* export const fetchScheduleOnDate = (carNumber, start, end, recordId) => fetchReservations(
  `$id!="${recordId}" and 号車="${carNumber}" and 開始 <= "${end}" and 終了 >= "${start}" `,
); */

export default fetchRecords;
