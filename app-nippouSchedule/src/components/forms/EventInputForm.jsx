import { useState } from 'react';
import FullWidth from '../containers/FullWidth';
import FormContainer from '../containers/FormContainer';
import MateriaTimePicker from '../UI/MaterialTimePicker';
import MaterialSelect from '../UI/MaterialSelect';
import './form.css';
import MaterialText from '../UI/MaterialText';
import { luxonTime, ISOtoDATE } from '../../helpers/Time';

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

const EventInputForm = ({ selectedTime }) => {
  const {
    start, end, actionType, actionDetails,
  } = selectedTime;

  const [startTime, setStartTime] = useState(ISOtoDATE(start));
  const [endTime, setEndTime] = useState(ISOtoDATE(end));

  const changeStartTimeHandler = (value) => {
    setStartTime(value);
    if (value > endTime) {
      setEndTime(value);
    }
  };
  const changeEndTimeHandler = (value) => {
    const validValue = startTime > value ? startTime : value;

    setEndTime(validValue);
  };

  return (
    <FullWidth>
      <FormContainer>
        <MaterialSelect id="actionType" label="区分" initialValue={actionType} />
        <MateriaTimePicker
          id="startTime"
          value={startTime}
          label="開始"
          minTime={luxonTime({ hour: 8 })}
          maxTime={luxonTime({ hour: 20 })}
          onChange={changeStartTimeHandler}
        />
        <MateriaTimePicker
          id="endTime"
          label="終了"
          value={endTime}
          minTime={startTime || ISOtoDATE(start)}
          maxTime={luxonTime({ hour: 20 })}
          onChange={changeEndTimeHandler}
        />
        <MaterialText id="actionDetails" label="行動" initialValue={actionDetails} />
      </FormContainer>
    </FullWidth>
  );
};

export default EventInputForm;
