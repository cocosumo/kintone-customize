import { DateTime } from 'luxon';

export const ISOtoDATE = (dateStr) => DateTime.fromISO(dateStr);

export const timeTo24Format = (date) => {
  const dateTime = (typeof (date) === 'string')
    ? ISOtoDATE(date)
    : date;

  return (
    dateTime
      .toLocaleString(DateTime.TIME_24_SIMPLE)).padStart(5, '0');
};

export const luxonTime = (
  {
    year, month, day, hour, minute,
  },
) => DateTime.utc(year || 1, month || 1, day || 1, hour || 0, minute || 0);
