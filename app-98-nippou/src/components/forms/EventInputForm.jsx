import MateriaTimePicker from '../UI/MaterialTimePicker';
import MaterialSelect from '../UI/MaterialSelect';
import './form.css';
import MaterialText from '../UI/MaterialText';
import {luxonTime} from '../../helpers/Time';
import {getOptions} from '../../backend/fetchSettings';

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

  FCEventContents,
  setErrorFields,
  onChangeStartTime,
  onChangeEndTime,
  onChangeActionType,
  onChangeActionDetails,
}) => {
  const {
    startTime, endTime, actionType, actionDetails,
  } = FCEventContents;

  return (
    <>
      <MaterialSelect id="actionType" label="区分" value={actionType} onChange={onChangeActionType} optionsData={getOptions()} />
      <MateriaTimePicker
        id="startTime"
        value={startTime}
        label="開始"
        minTime={luxonTime({hour: 7})}
        maxTime={luxonTime({hour: 23})}
        onChange={onChangeStartTime}
        setErrorFields={setErrorFields}
        isRequired
      />
      <MateriaTimePicker
        id="endTime"
        label="終了"
        value={endTime}
        minTime={luxonTime({hour: (startTime?.hour || 7), minute: (startTime?.minute || 0)})}
        maxTime={luxonTime({hour: 23})}
        onChange={onChangeEndTime}
        setErrorFields={setErrorFields}
      />
      <MaterialText id="actionDetails" label="詳細" value={actionDetails} onChange={onChangeActionDetails} />
    </>
  );
};
export default EventInputForm;
