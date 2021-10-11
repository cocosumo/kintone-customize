import { DateTime } from 'luxon';

export const ISOtoLux = (date) => DateTime.fromISO(date);

export const JSDToLux = (date) => DateTime.fromJSDate(date);

export const toLocaleDate = (date) => ISOtoLux(date).toLocaleString(DateTime.DATE_MED);

export const stringToLux = (dateStr) => DateTime.fromFormat(dateStr, 'yyyy-MM-dd');

export const isWithinMonth = (currMonth, luxDate) => {
  if (!luxDate || !currMonth) return false;
  const startDay = currMonth.startOf('month');
  const endDay = currMonth.endOf('month');

  return luxDate >= startDay && luxDate <= endDay;
};

export const isMonthNow = (luxDate) => isWithinMonth(DateTime.now(), luxDate);
