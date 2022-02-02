import { useState, createContext, useEffect } from 'react';
import onSubmitHandler from '../handlers/onSubmitHandler';
import { onEditOrCreateSubmit } from '../../../kintone-api/api';
import kintoneToFCEvents, { confirmedActions } from '../helpers/FCUtils';
import { fetchPlanOnDate } from '../backend/fetchRecords';

const setKintoneSubmitEvent = (actions, name) => {
  /* A dirty way to make use of existing DOM element with React. */
  const handler = (event) => onSubmitHandler(
    event, actions, name,
  );

  kintone.events.off(onEditOrCreateSubmit, handler);
  kintone.events.on(onEditOrCreateSubmit, handler);
};

type EventsProviderProps = {
  event: {
    [key : string] : any;
    type: string;
  },
  name: string
};

export const EventsContext = createContext({});

const EventsProvider : React.FC<EventsProviderProps> = (Props) => {
  const { event, name, children } = Props;
  const { type, record } = event;
  const { employeeNumber } = record;
  const isCreateScreen = type.includes('create');

  const initialEvents = isCreateScreen ? [] : kintoneToFCEvents(record, false, name);

  const [allEvents, setAllEvents] = useState(initialEvents);

  setKintoneSubmitEvent(confirmedActions(allEvents), name);

  console.log(event.type, 'hello');
  useEffect(() => {
    (async () => {
      if (name === 'report' && isCreateScreen) {
        const { reportDate } = record;
        /* Pull plans related to this report date */
        const plannedEvents = kintoneToFCEvents(
          (await fetchPlanOnDate(reportDate.value, employeeNumber.value))?.records[0],
          true,
          'plans',
        );
        setAllEvents((prev) => [...prev, ...plannedEvents]);
      }
    })();
  }, []);

  return (
    <EventsContext.Provider value={[allEvents, setAllEvents]}>
      {children}
    </EventsContext.Provider>
  );
};

export default EventsProvider;
