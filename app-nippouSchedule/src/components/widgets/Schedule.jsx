import EventsProvider from '../../store/EventsProvider';
import FullWidth from '../containers/FullWidth';
import MaterialReport from '../UI/MaterialReport';

const Schedule = ({ event, name }) => {
  console.log(name, 'successssss!');
  const { record } = event;
  return (
    <EventsProvider event={event} name={name}>
      <FullWidth>
        <MaterialReport selectedDate={record.reportDate.value} />
      </FullWidth>
    </EventsProvider>
  );
};

export default Schedule;
