import {DateTime, DateTimeUnit} from 'luxon';

interface LuxonTimeProps {
  year?: number,
  month?: number,
  day?: number,
  hour?: number,
  minute?: number,
}

export const convISOtoDATE = (dateStr: string) => DateTime.fromISO(dateStr);

export const timeTo24Format = (date: DateTime | string) => {
  if (date === null) return date;
  const dateTime = (typeof (date) === 'string')
    ? convISOtoDATE(date)
    : date;
  return (
    dateTime
      .toLocaleString(DateTime.TIME_24_SIMPLE)).padStart(5, '0');
};

export const luxonTime = (
  {
    year, month, day, hour, minute,
  }: LuxonTimeProps,
) => DateTime.utc(year || 1, month || 1, day || 1, hour || 0, minute || 0);

export const isPast = (dateTime: string) => (convISOtoDATE(dateTime).startOf('day') <= DateTime.now().startOf('day'));

export const dateTimeLuxon = (selectedDate : string, time: string) => DateTime.fromISO(`${selectedDate}T${time}:00.000`);

export const dateTimeISO = (selectedDate: string, time: string) => dateTimeLuxon(selectedDate, time).toISO();

export const resolveSchedType = (dateTime: string) => (isPast(dateTime) ? '実際の行動' : '予定の行動');

export const adjustByDays = (date: string, days: number) => DateTime
  .fromISO(date)
  .plus({days: days})
  .toISODate();

export const startOfUnit = (date: string, unit: DateTimeUnit) => DateTime.fromISO(date).startOf(unit).toISODate();
export const endOfUnit = (date: string, unit: DateTimeUnit) => DateTime.fromISO(date).endOf(unit).toISODate();

export const startOfMonth = (date: string) => startOfUnit(date, 'month');
export const endOfMonth = (date: string) => endOfUnit(date, 'month');

export const diffInDays = (start: string, end: string) => convISOtoDATE(end)
  .diff(convISOtoDATE(start), 'days')
  .toObject();

export const diffInMinutes = (start: string, end: string) => convISOtoDATE(end)
  .diff(convISOtoDATE(start), 'minutes')
  .toObject();

export const isEndDateValid = (start: string, end: string) => convISOtoDATE(start) < convISOtoDATE(end);

export const addDays = (date: string, num: number) => convISOtoDATE(date).plus({days: num});

export const addHours = (date: string, num: number) => convISOtoDATE(date).plus({hours: num});

export const getRangeInBetween = (start: string, end: string) => ({
  midStart: addDays(start, 1).toISODate(),
  midEnd: addDays(end, -1).toISODate(),
});
