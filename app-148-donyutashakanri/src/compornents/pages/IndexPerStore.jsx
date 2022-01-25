import PropTypes from 'prop-types';
import PerStoreTable from '../Table/PerStoreTable';
import {isSameMonth, parseISO} from 'date-fns';
import Stack from '@mui/material/Stack';
import YearMonthPicker from '../datepickers/YearMonthPicker';
import {useEffect, useState} from 'react';
import {fetchAllDonyutashaRecords} from '../../backend/donyutashakanri';

const IndexPerStore = ({event, componentRef}) => {

  // filtercond用のエリア名の抽出
  const areaName = event.viewName.substr(1, event.viewName.length - 1);
  const [records, setRecords] = useState([]); // recordsを空配列で初期化
  const [reportDate, setReportDate] = useState(new Date());

  // recordsの更新 filtering
  let data = records.filter(({適用年月}) => isSameMonth(reportDate, parseISO(適用年月.value)));
  data = data.filter(({エリア}) => (エリア.value.includes(areaName)));

  useEffect(() => {
    fetchAllDonyutashaRecords().then(resp => {
      // console.log('test', resp, queryForm);
      setRecords(resp);
    });
  }, [reportDate]);

  return (

    <Stack spacing={2}>

      <YearMonthPicker
        reportDate={reportDate}
        setReportDate={setReportDate}
        label="年月"
      />

      <PerStoreTable area={event.viewName} data={data} componentRef={componentRef} reportDate={reportDate} />
    </Stack>

  );
};

export default IndexPerStore;

IndexPerStore.propTypes = {
  event: PropTypes.object,
  componentRef: PropTypes.object
};
