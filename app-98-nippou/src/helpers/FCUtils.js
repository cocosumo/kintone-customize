import {dateTimeISO, isPast} from './Time';
import {getActionTypeData} from '../backend/fetchSettings';

export const resolveTitle = (event) => {
  const {type: eventType, record} = event;
  const {scheduleType, reportDate} = record;

  if (eventType.includes('edit')) {
    return `${scheduleType.value}を編集中です。`;
  }
  return isPast(reportDate.value) ? '当日何をしましたか。' : '予定を登録しますね。';
};

const kintoneToFCEvents = (record, isPlan, name) => {
  if (!record) return [];
  const {
    [`${name}Table`]: {value: subTable = []},
    [`${name}Date`]: {value: date},
  } = record;

  const fcEvents = subTable.filter(({value}) => {
    const {[`${name}ActionType`]: actionType} = value;
    return Boolean((actionType.value || '').length);
  }).map(
    ({value}) => {
      const {
        [`${name}ActionType`]: actionType,
        [`${name}StartTime`]: startTime,
        [`${name}EndTime`]: endTime,
        [`${name}ActionDetails`]: actionDetails,
      } = value;

      const buildIdString = (actionType.value + startTime.value + endTime.value).replace(/:/g, '');
      const data = getActionTypeData(actionType.value);
      const {bgColor, color} = data;
      return {
        id: buildIdString,
        title: actionType.value,
        start: dateTimeISO(date, startTime.value),
        end: dateTimeISO(date, endTime.value),
        classNames: [isPlan ? 'fc-planned-action' : 'fc-confirmed-action'],
        backgroundColor: bgColor,
        textColor: color,
        description: actionDetails.value,
        isPlan: Boolean(isPlan),
        editable: true,
      };
    },
  );

  return fcEvents;
};

export const confirmedActions = (allEvents) => allEvents.filter(({isPlan}) => !isPlan);

export default kintoneToFCEvents;
