import { timeTo24Format } from '../../helpers/DOM';

const TimeInput = ({ id, label, selectedTime }) => {
  // const initialValue = DateTime.fromISO(selectedTime).toLocaleString(DateTime.TIME_24_SIMPLE);
  const initialValue = timeTo24Format(selectedTime);
  return (
    <>
      <label htmlFor={id} className="form__label">
        {label}
        :
      </label>
      <input
        type="time"
        min="09:00"
        max="18:00"
        id={id}
        className="form__input form__input_text-single"
        defaultValue={initialValue}
      />
    </>
  );
};

export default TimeInput;
