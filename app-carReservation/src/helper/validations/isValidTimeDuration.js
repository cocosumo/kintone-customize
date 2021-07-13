import { DateTime } from 'luxon';

const dt = DateTime;

const isValidTimeDuration = (start, end) => (
  dt.fromISO(start) <= dt.fromISO(end)
);

export default isValidTimeDuration;
