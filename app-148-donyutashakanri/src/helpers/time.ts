import startOfYear from 'date-fns/startOfYear';
import endOfYear from 'date-fns/endOfYear';
import subMonths from 'date-fns/subMonths';

interface DateRange {
  start: Date,
  end: Date
}

export const fiscalYearRange = (reportDate : Date) : DateRange =>{
  return {
    start: subMonths(startOfYear(reportDate), 2),
    end: subMonths(endOfYear(reportDate), 2)
  };
};