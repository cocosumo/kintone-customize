import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import AllStoresTable from '../Table/AllStoresTable';
import {isSameMonth, parseISO} from 'date-fns';
import Stack from '@mui/material/Stack';
import YearMonthPicker from '../datepickers/YearMonthPicker';
import {fetchAllDonyutashaRecords} from '../../backend/donyutashakanri';

const IndexAllStores = ({componentRef}) => {

  const [records, setRecords] = useState([]); // recordsを空配列で初期化
  const [reportDate, setReportDate] = useState(new Date());

  useEffect(() => {
    fetchAllDonyutashaRecords().then(resp => {
      // console.log('test', resp, queryForm);
      setRecords(resp);
    });
  }, [reportDate]);

  // recordsの更新 filtering
  const data = records.filter(({適用年月}) => isSameMonth(reportDate, parseISO(適用年月.value)));
  // console.log('data', data);

  return (

    <Stack spacing={2}>

      <YearMonthPicker
        reportDate={reportDate}
        setReportDate={setReportDate}
        label="年月"
      />

      <AllStoresTable reportDate={reportDate} data={data} componentRef={componentRef} />
    </Stack>


  );
};

IndexAllStores.propTypes = {
  event: PropTypes.object,
  componentRef: PropTypes.object
};

export default IndexAllStores;
