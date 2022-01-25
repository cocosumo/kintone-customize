import {getAppId} from '../../../kintone-api/api';

/**
 * Fetch all records if condition is not provided
 *
 * @param condition optional filter condition
 * @returns
 */
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

/**
 * Fetch conflict record according to date
 *
 * @param start start dateTime
 * @param end end dateTime
 * @param carNumber optional filter.
 * @returns kintone records
 */
export const fetchConflictByDate = (start : string, end: string, carNumber: string | null = null) => {

  const conditions = [
    `開始 <= "${end}"`,
    `終了 >= "${start}" `
  ];

  if (carNumber) conditions.push(`号車="${carNumber}"`);

  return fetchReservations(
    conditions.join(' and '),
  );
};


/**
 * Fetch conflict records based on date, and car except the provided recordId
 *
 * @param carNumber
 * @param start start dateTime
 * @param end end dateTime
 * @param recordId recordID to be excempted
 * @returns kintone records
 */
export const fetchConflictByCarAndDate = (carNumber: string, start: string, end: string, recordId: string) => fetchReservations(
  `$id!="${recordId}" and 号車="${carNumber}" and 開始 <= "${end}" and 終了 >= "${start}" `,
);

/**
 * Fetch conflict records based on date except the provided recordId
 *
 * @param start start dateTime
 * @param end end dateTime
 * @param recordId recordID to be excempted
 * @returns kintone records
 */
export const fetchConflictByDateExceptId = (start: string, end: string, recordId: string) => fetchReservations(
  `$id!="${recordId}" and 開始 <= "${end}" and 終了 >= "${start}" `,
);

export default fetchReservations;
