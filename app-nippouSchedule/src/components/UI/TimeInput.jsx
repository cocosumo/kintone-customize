import { DateTime } from 'luxon';

const TimeInput = ({ id, label, selectedTime }) => {
  const initialValue = DateTime.fromISO(selectedTime).toLocaleString(DateTime.TIME_24_SIMPLE);

  return (
    <>
      <label htmlFor={id} className="form__label">
        {label}
        :
      </label>
      <input
        type="time"
        id={id}
        className="form__input form__input_text-single"
        defaultValue={initialValue}
      />
    </>
  );
};

export default TimeInput;
