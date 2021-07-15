import { getAppId } from '../../../kintone-api/api';

const fetchReservations = (condition = '') => {
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

export const fetchConflictByDate = (start, end) => fetchReservations(
  `開始 <= "${end}" and 終了 >= "${start}" `,
);
export const fetchConflictByCarAndDate = (carNumber, start, end, recordId) => fetchReservations(
  `$id!="${recordId}"and 号車="${carNumber}" and 開始 <= "${end}" and 終了 >= "${start}" `,
);

export default fetchReservations;
