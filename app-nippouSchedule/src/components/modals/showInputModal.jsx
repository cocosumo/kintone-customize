import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { DateTime } from 'luxon';
import TextAreaInput from '../UI/TextAreaInput';
import TimeInput from '../UI/TimeInput';

const MySwal = withReactContent(Swal);

const InputForm = ({ selectedTime }) => (
  <>
    <TimeInput label="開始" id="startTime" selectedTime={selectedTime} />
    <TimeInput label="終了" id="endTime" />

  </>
);

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

const preConfirmHandler = (dateStr) => {
  const startTime = (document.getElementById('startTime').value);
  const endTime = (document.getElementById('endTime').value);

  return {
    start: toISO(startTime, dateStr),
    end: toISO(endTime, dateStr),
  };
};

const eventInput = ({ dateStr }) => {
  const isClickedValidTime = dateStr.length > 10;

  if (!isClickedValidTime) return false;

  return MySwal.fire({
    title: <p>行動</p>,
    showCancelButton: true,
    html: <InputForm selectedTime={dateStr} />,
    focusConfirm: false,
    preConfirm: () => preConfirmHandler(dateStr),
  });
};

export default eventInput;
