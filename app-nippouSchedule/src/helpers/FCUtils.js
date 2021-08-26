import { dateTimeISO, isPast } from './Time';
import actionTypeData from '../store/actionTypeData';

export const resolveTitle = (event) => {
  const { type: eventType, record } = event;
  const { scheduleType, reportDate } = record;

  if (eventType.includes('edit')) {
    return `${scheduleType.value}を編集中です。`;
  }
  return isPast(reportDate.value) ? '当日何をしましたか。' : '予定を登録しますね。';
};

const kintoneToFCEvents = (record, isPlan) => {
  const {
    reportTable: { value: reportTable = [] },
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
      classNames: [isPlan ? 'fc-planned-action' : 'fc-confirmed-action'],
      backgroundColor: bgColor,
      textColor: color,
      description: actionDetails.value,
      isPlan: Boolean(isPlan),
      editable: true,
    };
  });

  return fcEvents;
};

export const confirmedActions = (allEvents) => allEvents.filter(({ isPlan }) => !isPlan);

export default kintoneToFCEvents;
