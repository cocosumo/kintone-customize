import { fetchRecords } from '../../../kintone-api/fetchRecords';
import {
  normDuration, normStatus, normType, yasumiWeight,
} from '../helpers/converters';
import { getEmployeeNumber } from './user';

const ownRecordFilter = `employeeNumber = "${getEmployeeNumber()}"`;

export const fetchYasumiRecords = async (luxonDate) => {
  const startDay = luxonDate.startOf('month').toISODate();
  const endDay = luxonDate.endOf('month').toISODate();

  return fetchRecords({
    condition: [
      ownRecordFilter,
      `yasumiDate >= "${startDay}"`,
      `yasumiDate <= "${endDay}"`,
    ].join(' and '),
  });
};

export const deleteRecordByDate = () => {

};

/*
yasumiRecToObj(luxonDate)
Example Output
{
 2021-09-01: [
   {
     type: day-ordinary
     duration: day-whole
     status: unprocessed
   }
 ],
}
*/
export const yasumiRecToObj = async (luxonDate) => (
  await fetchYasumiRecords(luxonDate)).records.reduce((accu, curr) => {
  const {
    $id: { value: recordId },
    yasumiDate: { value: yasumiDate },
    type: { value: yasumiType },
    duration: { value: duration },
    ステータス: { value: status },
  } = curr;

  accu[yasumiDate] = [].concat({
    id: recordId,
    type: normType[yasumiType],
    duration: normDuration[duration],
    status: normStatus[status],
  });

  return accu;
}, {});

export const yasumiUsed = (yasumiRecords) => {
  let result = 0;
  Object.values(yasumiRecords).forEach((val) => {
    const { duration = null } = val.find(({ type }) => type === 'day-ordinary') || [];
    result += duration ? yasumiWeight(duration) : 0;
  });

  return result;
};

export const defaultRecord = {
  type: 'day-ordinary',
  duration: null,
};
