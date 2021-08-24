import { dateTimeISO } from './Time';
import actionTypeData from '../static/actionTypeData';

const kintoneToFCEvents = ({ type: eventType, record }) => {
  if (eventType.includes('create')) return [];

  const {
    reportTable: { value: reportTable },
    reportDate: { value: reportDate },
  } = record;

  const fcEvents = reportTable.map(({ value }) => {
    const {
      actionType, startTime, endTime, actionDetails,
    } = value;
    const buildIdString = (actionType.value + startTime.value + endTime.value).replace(/:/g, '');
    const data = actionTypeData().find(({ type }) => type === actionType.value);
    const { bgColor, color } = data;
    return {
      id: buildIdString,
      title: actionType.value,
      start: dateTimeISO(reportDate, startTime.value),
      end: dateTimeISO(reportDate, endTime.value),
      backgroundColor: bgColor,
      textColor: color,
      description: actionDetails.value,
      editable: true,
    };
  });
  return fcEvents;
};

export default kintoneToFCEvents;
