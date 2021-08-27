import { useState, createContext, useEffect } from 'react';
import onSubmitHandler from '../handlers/onSubmitHandler';
import { onEditOrCreateSubmit } from '../../../kintone-api/api';
import kintoneToFCEvents, { confirmedActions } from '../helpers/FCUtils';
import { fetchPlanOnDate } from '../backend/fetchRecords';

const setKintoneSubmitEvent = (actions, name) => {
  const handler = (event) => onSubmitHandler(
    event, actions, name,
  );

  kintone.events.off(onEditOrCreateSubmit, handler);
  kintone.events.on(onEditOrCreateSubmit, handler);
};

export const EventsContext = createContext();

const EventsProvider = ({ event, name, children }) => {
  const { type, record } = event;

  const initialEvents = type.includes('create') ? [] : kintoneToFCEvents(record, false, name);

  const [allEvents, setAllEvents] = useState(initialEvents);

  setKintoneSubmitEvent(confirmedActions(allEvents), name);

  useEffect(async () => {
    if (name === 'report') {
      const { reportDate, creator } = record;
      /* Pull plans related to this report date */
      const plannedEvents = kintoneToFCEvents(
        (await fetchPlanOnDate(reportDate.value, creator.value))?.records[0],
        true,
        'plans',
      );
      setAllEvents((prev) => [...prev, ...plannedEvents]);
    }
  }, []);

  /* useEffect(async () => {
    const { scheduleType, reportDate } = record;

    if ((scheduleType.value).includes('予定')) return;

    const plannedRecord = await fetchSchedPlanOnDate(reportDate.value);

    if (plannedRecord) {
      kintoneToFCEvents(plannedRecord, true);
      setAllEvents([...allEvents, ...kintoneToFCEvents(plannedRecord, true)]);
    }
  }, []); */

  // setKintoneSubmitEvent(confirmedActions(allEvents),name);
  return (
    <EventsContext.Provider value={[allEvents, setAllEvents]}>
      {children}
    </EventsContext.Provider>
  );
};

export default EventsProvider;
