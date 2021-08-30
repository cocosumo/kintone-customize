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

export const fetchPlanOnDate = async (selectedDate, creator) => (fetchRecords(
  `plansDate = "${selectedDate}" and creator="${creator || getUserName()}" limit 1`,
));

export const fetchReportOnDate = async (selectedDate, creator) => (fetchRecords(
  `reportDate = "${selectedDate}" and creator ="${creator || getUserName()}" limit 1`,
));

export const fetchMonthRecords = (date, creator) => fetchRecords(
  `creator = "${creator || getUserName()}"
  and reportDate >= "${startOfMonth(date)}"
  and reportDate <= "${endOfMonth(date)}"`,
);

export const fetchFields = () => {
  const body = {
    app: getAppId(),
  };
  return kintone.api(
    kintone.api.url('/k/v1/app/form/fields', true),
    'GET',
    body,
  );
};

export default fetchRecords;
