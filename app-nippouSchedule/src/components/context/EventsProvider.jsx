import React, { useState } from 'react';
import { DateTime } from 'luxon';
import onSubmitHandler from '../../handlers/onSubmitHandler';
import { onEditOrCreateSubmit } from '../../../../kintone-api/api';
import actionTypeData from '../../static/actionTypeData';

const setKintoneSubmitEvent = (allEvents) => {
  kintone.events.off(onEditOrCreateSubmit);
  kintone.events.on(onEditOrCreateSubmit, (event) => onSubmitHandler(event, allEvents));
};

const dateTimeISO = (selectedDate, time) => DateTime.fromISO(`${selectedDate}T${time}:00.000`).toISO();

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

export const EventsContext = React.createContext();

export default function EventsProvider({ event, children }) {
  const initialFCEvents = kintoneToFCEvents(event);
  const [allEvents, setAllEvents] = useState(initialFCEvents);
  const value = [allEvents, setAllEvents];

  setKintoneSubmitEvent(allEvents);

  return (
    <EventsContext.Provider value={value}>
      {children}
    </EventsContext.Provider>
  );
}
