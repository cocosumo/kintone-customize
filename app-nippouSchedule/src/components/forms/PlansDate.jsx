import { useState } from 'react';
import { Typography } from '@material-ui/core';
import { onFieldChange } from '../../../../kintone-api/api';
import {
  addDays, diffInDays, getRangeInBetween, isEndDateValid,
} from '../../helpers/Time';
import InfoContainer from '../containers/InfoContainer';

const resetEventHandler = (setPlansDate) => {
  const handler = (event) => {
    const { record } = event;
    const { plansDate, reportDate } = record;

    if (isEndDateValid(reportDate.value, plansDate.value)) {
      setPlansDate(plansDate.value);
    } else {
      plansDate.value = addDays(reportDate.value, 1);
      setPlansDate(plansDate.value);
    }

    return event;
  };
  kintone.events.off(onFieldChange('plansDate'));
  kintone.events.on(onFieldChange('plansDate'), handler);
};

const resolveMessage = (start, end) => {
  const { days: diff } = diffInDays(start, end);

  if (diff > 1) {
    const { midStart, midEnd } = getRangeInBetween(start, end);
    if (diff === 2) {
      return `休みは${midStart}ですね。`;
    }
    return `休みは${midStart}から${midEnd}までですね。`;
  }
  return '';
};

const PlansDate = ({ event }) => {
  const { record } = event;
  const {
    plansDate: { value: plansDateVal },
    reportDate: { value: reportDateVal },
  } = record;

  const [plansDate, setPlansDate] = useState(plansDateVal);
  const message = resolveMessage(reportDateVal, plansDate);
  const isContainMessage = Boolean(message);

  resetEventHandler(setPlansDate);
  return (
    isContainMessage && (
    <InfoContainer>
      <Typography sx={{ fontSize: 16 }}>
        {message}
      </Typography>
    </InfoContainer>
    )
  );
};

export default PlansDate;
