import { getAppId } from '../../../kintone-api/api';
import { endOfMonth, startOfMonth } from '../helpers/Time';
import { getEmployeeNumber } from './user';

const ownRecordFilter = `employeeNumber = "${getEmployeeNumber()}"`;

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
  `plansDate = "${selectedDate}" and ${ownRecordFilter} limit 1`,
));

export const fetchReportOnDate = async (selectedDate) => (fetchRecords(
  `reportDate = "${selectedDate}" and ${ownRecordFilter} limit 1`,
));

export const fetchMonthRecords = (date, employeeNumber = getEmployeeNumber()) => fetchRecords(
  `employeeNumber = "${employeeNumber}"
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
