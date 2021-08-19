import React, { useState } from 'react';

/* Store */

export const EventsContext = React.createContext();

export default function EventsProvider({ children }) {
  const [allEvents, setAllEvents] = useState([]);
  const value = [allEvents, setAllEvents];

  return (
    <EventsContext.Provider value={value}>
      {children}
    </EventsContext.Provider>
  );
}
