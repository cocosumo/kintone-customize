import PropTypes from 'prop-types';
import Table from '../Table';
import {isSameMonth, parseISO} from 'date-fns';
import Stack from '@mui/material/Stack';
import YearMonthPicker from '../datepickers/YearMonthPicker';
import {useState} from 'react';


const IndexAllStores = ({event, componentRef}) => {

  const [reportDate, setReportDate] = useState(new Date());
  console.log('reportDate', reportDate);

  // recordsの更新 filtering
  const data = event.records.filter(({適用年月}) => isSameMonth(reportDate, parseISO(適用年月.value)));

  const vartype = typeof reportDate;
  console.log('vartype: ', vartype);
  console.log('data', data);

  return (

    <Stack spacing={2}>

      <YearMonthPicker
        reportDate={reportDate}
        setReportDate={setReportDate}
      />

      <Table area={event.viewName} data={data} componentRef={componentRef} />
    </Stack>


  );
};

export default IndexAllStores;

IndexAllStores.propTypes = {
  event: PropTypes.object,
  componentRef: PropTypes.object
};
