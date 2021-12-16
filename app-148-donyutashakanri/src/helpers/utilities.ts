
import {addMonths, isSameMonth, parseISO} from 'date-fns';

/**
 * Create container inside the defined selector
 *
 * @param selector the selector of the existing element in the DOM.
 * @param containerId [containerId = "custom-space-element"] Optional. Used as the id of generated container.
 * @param isAppendBefore [isAppendToLast = false] true will append the element. false will prepend the element.
 *
 * @returns the generated element.
 *
 * @todo 仕様書の日本語の訳
 */

export const createContainer = (
  selector : string,
  containerId = 'custom-space-element',
  isAppendBefore = false
) => {

  document.getElementById(containerId)?.remove();

  const DOMRoot = document.querySelector(selector);
  const container = document.createElement('span');
  container.id = containerId;

  if (isAppendBefore) {
    DOMRoot?.prepend(container);
  } else {
    DOMRoot?.append(container);
  }

  return document.getElementById(containerId);
};


/**
 * Restructure kintone records that is grouped by site into matrix of 導入他社数 values
 * where Y-axis = months, and X-axis = sites.
 *
 * @param startDate starting date.
 * @param endDate end date.
 * @param groupedRecordsBySite kintone records grouped by site.
 * @param data Holds the resulting data.
 * @returns returns the restructured data.
 */
export const generateTotal = (
  startDate : Date,
  endDate : Date,
  groupedRecordsBySite : {[site : string] : KintoneTypes.SavedData[]},
  data : GroupedRecords[] = [],
) => {

  if (startDate.getTime() < endDate.getTime()) {

    const valuesPerSite = Object.entries(groupedRecordsBySite)
      .reduce((accu : {[key : string] : number}, curr : GroupedRecordsArray) => {

        const [site, records] = curr;
        const values = records
          .reduce((_accu, _curr : KintoneTypes.SavedData) => {
            const {適用年月, 導入他社数} = _curr;
            return _accu + (isSameMonth(parseISO(適用年月.value), startDate) ? +導入他社数.value : 0);
          }, 0);

        return {...accu, ...{[site]: values}};
      }, {});

    data.push({[startDate.toISOString()]: valuesPerSite});

    generateTotal(
      addMonths(startDate, 1),
      endDate,
      groupedRecordsBySite,
      data
    );
  }

  return data;
};