import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import TextAreaInput from '../UI/TextAreaInput';
import TimeInput from '../UI/TimeInput';

const MySwal = withReactContent(Swal);

const InputForm = ({ selectedTime }) => (
  <>
    <TimeInput label="開始" id="startTime" selectedTime={selectedTime} />
    <TimeInput label="終了" id="endTime" />

  </>
);

const eventInput = ({ dateStr }) => {
  const isClickedValidTime = dateStr.length > 10;

  if (!isClickedValidTime) return false;

  return MySwal.fire({
    title: <p>行動</p>,
    html: <InputForm selectedTime={dateStr} />
    ,
  });
};

export default eventInput;
