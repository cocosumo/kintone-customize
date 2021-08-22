import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { DateTime } from 'luxon';
import getValue from '../../helpers/DOM';
import actionTypeData from '../../static/actionTypeData';
import areYouSure from './areYouSure';
import EventInputForm from '../forms/EventInputForm';

const MySwal = withReactContent(Swal);

const getHour = (time) => time.substring(0, 2);
const getMinutes = (time) => time.substring(3, 5);
const toISO = (time, dateStr) => {
  const dateToModify = DateTime.fromISO(dateStr);
  const modifiedDate = dateToModify.set({
    hours: getHour(time) || '00',
    minutes: getMinutes(time) || '00',
  });

  return modifiedDate.toISO();
};

const getInputHandler = ({ start }) => {
  const startTime = getValue('#startTime');
  const endTime = getValue('#endTime');
  const actionType = getValue('#actionType');
  const actionDetails = getValue('#actionDetails');
  const buildIdString = (actionType + startTime + endTime).replace(/:/g, '');
  const data = actionTypeData().find(({ type }) => type === actionType);
  const { bgColor, color } = data;
  return {
    id: buildIdString,
    title: actionType,
    start: toISO(startTime, start),
    end: toISO(endTime, start),
    backgroundColor: bgColor,
    textColor: color,
    description: actionDetails,
    editable: true,
  };
};

const eventInputModal = (event, handler, isEventClicked) => {
  const eventObject = {
    start: event.dateStr || event.startStr || null,
    end: event.endStr || null,
    actionType: event.title || null,
    actionDetails: event.description || null,
  };

  return MySwal.fire({
    showCancelButton: true,

    html: <EventInputForm selectedTime={eventObject} />,
    focusConfirm: true,
    heightAuto: false,
    reverseButtons: true,
    showCloseButton: true,
    showDenyButton: true,
    denyButtonText: '削除',
    preDeny: async () => {
      const { isConfirmed } = await areYouSure();
      if (!isConfirmed) return eventInputModal(event, handler, isEventClicked);
      return false;
    },
    preConfirm: () => handler(event, getInputHandler(eventObject), isEventClicked),
  });
};

export default eventInputModal;
