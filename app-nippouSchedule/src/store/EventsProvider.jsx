import { useState, createContext, useEffect } from 'react';
import onSubmitHandler from '../handlers/onSubmitHandler';
import { onEditOrCreateSubmit } from '../../../kintone-api/api';
import kintoneToFCEvents, { confirmedActions } from '../helpers/FCUtils';
import { fetchSchedPlanOnDate } from '../backend/fetchSchedule';

const setKintoneSubmitEvent = (actions) => {
  kintone.events.off(onEditOrCreateSubmit);
  kintone.events.on(onEditOrCreateSubmit, (event) => onSubmitHandler(
    event, actions,
  ));
};

export const EventsContext = createContext();

const EventsProvider = ({ event, children }) => {
  const { type, record } = event;
  const initialEvents = type.includes('create') ? [] : kintoneToFCEvents(record);

  const [allEvents, setAllEvents] = useState(initialEvents);

  useEffect(async () => {
    const { scheduleType, reportDate } = record;

    if ((scheduleType.value).includes('予定')) return;

    const plannedRecord = await fetchSchedPlanOnDate(reportDate.value);

    if (plannedRecord) {
      kintoneToFCEvents(plannedRecord, true);
      setAllEvents([...allEvents, ...kintoneToFCEvents(plannedRecord, true)]);
    }
  }, []);

  setKintoneSubmitEvent(confirmedActions(allEvents));

  return (
    <EventsContext.Provider value={[allEvents, setAllEvents]}>
      {children}
    </EventsContext.Provider>
  );
};

export default EventsProvider;
