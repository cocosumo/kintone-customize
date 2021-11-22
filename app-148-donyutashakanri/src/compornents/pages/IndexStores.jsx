import PropTypes from 'prop-types';
import PerStoreTable from '../Table/PerStoreTable';
import {isSameMonth, parseISO} from 'date-fns';
import Stack from '@mui/material/Stack';
import YearMonthPicker from '../datepickers/YearMonthPicker';
import {useState} from 'react';


const IndexStores = ({event, componentRef}) => {

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

      <PerStoreTable area={event.viewName} data={data} componentRef={componentRef} />
    </Stack>


  );
};

export default IndexStores;

IndexStores.propTypes = {
  event: PropTypes.object,
  componentRef: PropTypes.object
};
