import MateriaTimePicker from '../UI/MaterialTimePicker';
import MaterialSelect from '../UI/MaterialSelect';
import './form.css';
import MaterialText from '../UI/MaterialText';
import { luxonTime } from '../../helpers/Time';
import actionTypeData from '../../store/actionTypeData';

/**
 * Prop => Event Object
 * selectedTime
 * {
 *  start : ISO String
 *  end : ISO String
 *  actionType : string
 *  actionDetails : string
 * }
 *
 * Material UI dates are set to accept DateTime Object thus it needs conversion.
 *
 * I might consider refactoring this if more components
 * share the same requirements.
 *  */

const EventInputForm = ({
  onChangeHandlers,
  FCEventContents,
  setErrorFields,
  onChangeEndTime,
}) => {
  const [
    setStartTime, setEndTime, setActionType, setActionDetails,
  ] = onChangeHandlers;
  const {
    startTime, endTime, actionType, actionDetails,
  } = FCEventContents;

  return (
    <>
      <MaterialSelect id="actionType" label="区分" value={actionType} onChange={setActionType} optionsData={actionTypeData()} />
      <MateriaTimePicker
        id="startTime"
        value={startTime}
        label="開始"
        minTime={luxonTime({ hour: 8 })}
        maxTime={luxonTime({ hour: 20 })}
        onChange={setStartTime}
        setErrorFields={setErrorFields}
        isRequired
      />
      <MateriaTimePicker
        id="endTime"
        label="終了"
        value={endTime}
        minTime={luxonTime({ hour: (startTime?.hour || 9), minute: (startTime?.minute || 0) })}
        maxTime={luxonTime({ hour: 20 })}
        onChange={onChangeEndTime}
        setErrorFields={setErrorFields}
      />
      <MaterialText id="actionDetails" label="行動" value={actionDetails} onChange={setActionDetails} />
    </>
  );
};
export default EventInputForm;
