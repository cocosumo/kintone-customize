/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DeleteIcon from '@material-ui/icons/Delete';
import { useState } from 'react';
import { Grid, DialogTitle } from '@material-ui/core';
import EventInputForm from '../forms/EventInputForm';
import { dateTimeLuxon, ISOtoDATE, timeTo24Format } from '../../helpers/Time';
import { reduceEvent } from '../../helpers/DOM';
import actionTypeData from '../../static/actionTypeData';
import { CloseButton } from '../UI/MaterialActionButtons';

const EventEditDialog = ({
  open, onFormClose, selectedTime,
}) => {
  const selectedFCEvent = reduceEvent(selectedTime);
  const initialDate = selectedTime?._context?.options.initialDate;
  const selectedId = selectedTime?.id;
  const isEventPressed = Boolean(selectedId);
  const [startTime, setStartTime] = useState(ISOtoDATE(selectedFCEvent.startTime));
  const [endTime, setEndTime] = useState(ISOtoDATE(selectedFCEvent.endTime));
  const [actionType, setActionType] = useState(
    selectedFCEvent.actionType || actionTypeData()[0].type,
  );
  const [actionDetails, setActionDetails] = useState(selectedFCEvent.actionDetails);
  const [errorCount, setErrorCount] = useState(0);

  const changeStartTimeHandler = (value) => {
    if (!value) {
      setStartTime(0);
    } else {
      setStartTime(value);
      if (!value.invalid && value > endTime) {
        setEndTime(value);
      }
    }
  };
  const changeEndTimeHandler = (value) => {
    if (value === null) {
      setEndTime(null);
    } else if (initialDate) {
      let validValue = dateTimeLuxon(initialDate, timeTo24Format(value));
      validValue = startTime > validValue ? startTime : validValue;
      setEndTime(validValue);
    } else {
      setEndTime(value);
    }
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
    id: selectedTime?.id,
    startTime,
    endTime,
    actionType,
    actionDetails,
  };

  // const fullScreen = useMediaQuery(useTheme().breakpoints.down('md'));

  const TitleBar = () => (
    <DialogTitle sx={{ py: 1, pr: 1 }}>
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="baseline"
      >
        <CloseButton onClick={(event) => onFormClose({ closeMethod: 'cancel', event })} />
      </Grid>
    </DialogTitle>
  );

  return (

    <Dialog
      open={open}
      maxWidth="xs"
      onBackdropClick={(event) => onFormClose({ closeMethod: 'cancel', event })}

    >
      <TitleBar />
      <DialogContent>
        <EventInputForm
          onChangeHandlers={changeHandlers}
          FCEventContents={newEvent}
          setErrorCount={setErrorCount}

        />
      </DialogContent>
      <DialogActions>

        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="baseline"
        >
          <Grid>
            {isEventPressed && (
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={() => onFormClose({ closeMethod: 'delete', data: { id: selectedId } })}
            >
              削除
            </Button>

            )}
          </Grid>
          <Grid>

            <Button
              sx={{ fontSize: 16 }}
              onClick={() => onFormClose({ closeMethod: 'cancel' })}
            >
              キャンセル
            </Button>

            <Button
              sx={{ fontSize: 16 }}
              disabled={Boolean(errorCount)}
              variant="contained"
              onClick={() => onFormClose({ closeMethod: 'save', data: newEvent })}
            >
              保存
            </Button>
          </Grid>
        </Grid>

      </DialogActions>
    </Dialog>

  );
};

export default EventEditDialog;
