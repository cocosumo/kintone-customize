import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { useState } from 'react';
import EventInputForm from '../forms/EventInputForm';
import { ISOtoDATE } from '../../helpers/Time';

const reduceEvent = (s) => {
  if (!s) return {};
  return {
    startTime: s.dateStr || s.startStr || null,
    endTime: s.endStr || null,
    actionType: s.title || null,
    actionDetails: s.extendedProps?.description || null,
  };
};

const MaterialEventInput = ({
  open, onFormClose, selectedTime, optionsData,
}) => {
  const selectedFCEvent = reduceEvent(selectedTime);
  const [startTime, setStartTime] = useState(ISOtoDATE(selectedFCEvent.startTime));
  const [endTime, setEndTime] = useState(ISOtoDATE(selectedFCEvent.endTime));
  const [actionType, setActionType] = useState(
    selectedFCEvent.actionType || optionsData[0].type,
  );
  const [actionDetails, setActionDetails] = useState(selectedFCEvent.actionDetails);
  const [isError, setIsError] = useState();

  const changeStartTimeHandler = (value) => {
    if (!value) {
      setStartTime('08:00');
      setEndTime(null);
    } else {
      setStartTime(value);
      if (value > endTime) {
        setEndTime(value);
      }
    }
  };
  const changeEndTimeHandler = (value) => {
    const validValue = startTime > value ? startTime : value;
    setEndTime(validValue);
  };

  const changeActionTypeHandler = (el) => {
    setActionType(el.target.value);
  };

  const changeActionDetailsHandler = (el) => {
    setActionDetails(el.target.value);
  };

  const changeHandlers = [
    changeStartTimeHandler,
    changeEndTimeHandler,
    changeActionTypeHandler,
    changeActionDetailsHandler,
  ];

  const newEvent = {
    id: selectedTime.id,
    startTime,
    endTime,
    actionType,
    actionDetails,
  };

  return (
    <Dialog
      open={open}
      onClose={() => onFormClose(false)}
      fullWidth
      maxWidth="sm"
    >
      <DialogContent>
        <EventInputForm
          onChangeHandlers={changeHandlers}
          FCEventContents={newEvent}
          optionsData={optionsData}
          setIsError={setIsError}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onFormClose(false)}>キャンセル</Button>
        <Button
          disabled={isError}
          variant="contained"
          onClick={() => onFormClose(newEvent)}
        >
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MaterialEventInput;
