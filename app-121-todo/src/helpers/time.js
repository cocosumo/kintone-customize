import {
  addDays, addMonths, isBefore, startOfMonth, startOfWeek,
} from 'date-fns';

const addDaysToDate = (date, days) => days.map((day) => addDays(date, day));

export const eachWeekDayOfInterval = (interval, weekDays) => {
  const { end, start } = interval;
  const selectedWeekDays = [];
  weekDays.sort();

  let curr = startOfWeek(start);
  while (isBefore(curr, end)) {
    selectedWeekDays.push(...addDaysToDate(curr, weekDays));
    curr = addDays(curr, 7);
  }
  return selectedWeekDays;
};

export const eachMonthDayOfInterval = (interval, monthDays) => {
  const { end, start } = interval;
  const selectedMonthDays = [];
  monthDays.sort((a, b) => a - b);

  let curr = startOfMonth(start);
  console.log(monthDays);
  while (isBefore(curr, end)) {
    selectedMonthDays.push(...addDaysToDate(curr, monthDays));

    curr = addMonths(curr, 1);
  }

  return selectedMonthDays;
};
