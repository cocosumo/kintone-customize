import { DateTime } from 'luxon';
import FullWidth from '../containers/FullWidth';
import styles from './TimeInput.module.css';

const TimeInput = ({ id, label, selectedTime }) => {
  const initialValue = DateTime.fromISO(selectedTime).toLocaleString(DateTime.TIME_24_SIMPLE);
  return (
    <FullWidth>
      <label htmlFor={label} className={styles.Label}>
        {label}
        :
      </label>
      <input
        type="time"
        id={id}
        className={styles.Input}
        defaultValue={initialValue}
      />
    </FullWidth>
  );
};

export default TimeInput;
