import { useState } from 'react';
import { Container } from '@material-ui/core';
import MonthCalendar from '../UI/MonthCalendar';
import { JSDToLux } from '../helpers/time';
import getYasumiCount from '../backend/settings';

const YasumiRegistry = () => {
  const [remainingYasumi, setRemainingYasumi] = useState();

  const clickDayHandler = (event) => {
    const { dayEl } = event;

    dayEl.classList.add('day-bg--yukyuu');
  };

  const datesSetHandler = async ({ view }) => {
    const { currentStart } = view;

    const yasumiCount = await getYasumiCount(JSDToLux(currentStart));
    setRemainingYasumi(yasumiCount);
  };

  return (
    <Container maxWidth="md">
      <MonthCalendar {...{
        remainingYasumi,
        datesSetHandler,
        clickDayHandler,
      }}
      />
    </Container>
  );
};

export default YasumiRegistry;
