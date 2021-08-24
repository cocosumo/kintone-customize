import { useState, createContext } from 'react';
import onSubmitHandler from '../handlers/onSubmitHandler';
import { onEditOrCreateSubmit } from '../../../kintone-api/api';
import kintoneToFCEvents from '../helpers/converters';

const setKintoneSubmitEvent = (allEvents) => {
  kintone.events.off(onEditOrCreateSubmit);
  kintone.events.on(onEditOrCreateSubmit, (event) => onSubmitHandler(event, allEvents));
};

export const EventsContext = createContext();

export default function EventsProvider({ event, children }) {
  const [allEvents, setAllEvents] = useState(kintoneToFCEvents(event));
  const value = [allEvents, setAllEvents];

  setKintoneSubmitEvent(allEvents);

  return (
    <EventsContext.Provider value={value}>
      {children}
    </EventsContext.Provider>
  );
}
