import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { DateTime } from 'luxon';
import TextAreaInput from '../UI/TextAreaInput';
import TimeInput from '../UI/TimeInput';
import FormContainer from '../containers/FormContainer';
import FullWidth from '../containers/FullWidth';
import Dropdown from '../UI/Dropdown';
import getValue from '../../helpers/DOM';

const MySwal = withReactContent(Swal);

const InputForm = ({ selectedTime }) => {
  const {
    start, end, actionType, actionDetails,
  } = selectedTime;

  return (
    <FullWidth>
      <FormContainer>
        <Dropdown label="区分" id="actionType" initialValue={actionType} />
        <TimeInput label="開始" id="startTime" selectedTime={start} />
        <TimeInput label="終了" id="endTime" selectedTime={end} />
        <TextAreaInput label="行動" id="actionDetails" initialValue={actionDetails} />
      </FormContainer>
    </FullWidth>
  );
};

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
  const selectedOption = $('#actionType').find('option:selected');
  const buildIdString = (actionType + startTime + endTime).replace(/:/g, '');

  return {
    id: buildIdString,
    title: actionType,
    start: toISO(startTime, start),
    end: toISO(endTime, start),
    backgroundColor: selectedOption.attr('data-bgcolor'),
    textColor: selectedOption.attr('data-color'),
    description: actionDetails,
    editable: true,
  };
};

const eventInput = (event) => {
  const eventObject = {
    start: event.dateStr || event.startStr || null,
    end: event.endStr || null,
    actionType: event.title || null,
    actionDetails: event.description || null,
  };

  return MySwal.fire({
    title: <p>行動</p>,
    showCancelButton: true,
    html: <InputForm selectedTime={eventObject} />,
    focusConfirm: false,
    heightAuto: false,
    showCloseButton: true,
    preConfirm: () => getInputHandler(eventObject),
  });
};

export default eventInput;
