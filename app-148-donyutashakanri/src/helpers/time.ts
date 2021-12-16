import startOfYear from 'date-fns/startOfYear';
import endOfYear from 'date-fns/endOfYear';
import subMonths from 'date-fns/subMonths';

interface DateRange {
  start: Date,
  end: Date
}


/**
 * Generates fiscal year range.
 *
 * @param reportDate The date where the fiscal year will be based. defa
 * @param adjustBy number of months to adjust the fiscal year backwards.
 * @returns DateRange object.
 */

export const fiscalYearRange = (reportDate = new Date(), adjustBy = 2) : DateRange =>{
  return {
    start: subMonths(startOfYear(reportDate), adjustBy),
    end: subMonths(endOfYear(reportDate), adjustBy)
  };
};