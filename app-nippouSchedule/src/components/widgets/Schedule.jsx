import EventsProvider from '../../store/EventsProvider';
import FullWidth from '../containers/FullWidth';
import MaterialReport from '../UI/MaterialReport';

const Schedule = ({ event, name }) => {
  const { record } = event;
  const { [`${name}Date`]: selectedDate } = record;
  return (
    <EventsProvider event={event} name={name}>
      <FullWidth>
        <MaterialReport selectedDate={selectedDate.value} />
      </FullWidth>
    </EventsProvider>
  );
};

export default Schedule;
