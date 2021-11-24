import PropTypes from 'prop-types';
import AllStoresTable from '../Table/AllStoresTable';
import {isSameMonth, parseISO} from 'date-fns';
import Stack from '@mui/material/Stack';
import YearMonthPicker from '../datepickers/YearMonthPicker';
import {useState} from 'react';

const IndexAllStores = ({event, componentRef}) => {

  const [reportDate, setReportDate] = useState(new Date());

  // recordsの更新 filtering
  const data = event.records.filter(({適用年月}) => isSameMonth(reportDate, parseISO(適用年月.value)));

  return (

    <Stack spacing={2}>

      <YearMonthPicker
        reportDate={reportDate}
        setReportDate={setReportDate}
      />

      <AllStoresTable targetDate={reportDate} data={data} componentRef={componentRef} />
    </Stack>


  );
};

IndexAllStores.propTypes = {
  event: PropTypes.object,
  componentRef: PropTypes.object
};

export default IndexAllStores;
