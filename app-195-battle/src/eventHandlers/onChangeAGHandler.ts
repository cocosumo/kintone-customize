import {KintoneEvent} from './onCreateOrEditSubmitHandler';

export const onChangeAGHandler = (event: KintoneEvent) => {
  const {record: {
    担当者: ag,
  }} = event;

  const newValues = ag.value.map((row, index) => {

    const floorVal = Math.floor(10 / ag.value.length);
    const remainder = 10 - (floorVal * ag.value.length);
    const percentVal = index === 0 ? floorVal + remainder : floorVal;

    return ({
      ...row,
      value: {
        ...row.value,
        percent: {
          ...row.value.percent,
          value: percentVal.toString()
        }
      }
    });
  });


  event.record.担当者.value = newValues;

  /*
{...event, record: {
  ...event.record,
  担当者: {
    ...event.record.担当者,
    value: newValues
  }
}}
*/
  return event;
};