import { useState, createContext, useEffect } from 'react';
import onSubmitHandler from '../handlers/onSubmitHandler';
import { onEditOrCreateSubmit } from '../../../kintone-api/api';
import kintoneToFCEvents from '../helpers/converters';
import { fetchScheduleOnDate } from '../backend/fetchSchedule';

const setKintoneSubmitEvent = (allEvents) => {
  kintone.events.off(onEditOrCreateSubmit);
  kintone.events.on(onEditOrCreateSubmit, (event) => onSubmitHandler(event, allEvents));
};

export const EventsContext = createContext();

const EventsProvider = ({ event, children }) => {
  const [allEvents, setAllEvents] = useState(kintoneToFCEvents(event));
  const value = [allEvents, setAllEvents];
  useEffect(async () => {
    const kintoneEvents = await fetchScheduleOnDate(event.record.reportDate.value);
    console.log(kintoneEvents);
  }, []);

  setKintoneSubmitEvent(allEvents);

  return (
    <EventsContext.Provider value={value}>
      {children}
    </EventsContext.Provider>
  );
};

export default EventsProvider;
