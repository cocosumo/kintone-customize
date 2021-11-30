import {useEffect, useState} from 'react';
import YearMonthPicker from '../datepickers/YearMonthPicker';
import {fetchDonyutashaRecords} from '../../backend/donyutashakanri';
import {groupRecordsByField} from '../../../../app-147-baikyakukanrihyou/src/helpers/utils';
import './../../pageShowHandlers/index.css';
// import {fiscalYearRange} from '../../helpers/time';
import {subYears} from 'date-fns';
import {Stack} from '@mui/material';
import PropTypes from 'prop-types';
import MultiSelect from '../select/MultiSelect';
import DonyuTashaTable from '../Table/DonyuTashaTable';

const IndexPerSite = ({componentRef}) => {

  const [records, setRecords] = useState([]); // recordsを空配列で初期化
  /* const [reportDate, setReportDate] = useState(new Date()); */
  const [queryForm, setQueryForm] = useState({endDate: new Date(), startDate: subYears(new Date(), 1), shops: []});

  queryForm.endDate.setMonth(queryForm.endDate.getMonth() + 1); // endDateは月末日に設定する
  queryForm.endDate.setDate(0);

  queryForm.startDate.setDate(1); // startDateは月初日に設定する

  useEffect(() => {
    fetchDonyutashaRecords(queryForm).then(resp => {
      // console.log('test', resp, queryForm);
      setRecords(resp);
    });
  }, [queryForm]);

  const setStartDate = (startDate) => {
    setQueryForm({...queryForm, startDate: startDate});
  };

  const setEndDate = (endDate) => {
    setQueryForm({...queryForm, endDate});
  };

  const updateSelectedStores = (selectedStores) => {
    /* setQueryForm(Object.assign(queryForm, {shops:selectedStores})); 1行下と同じ*/
    setQueryForm({...queryForm, shops: selectedStores});
  };

  const isStoreSelected = Boolean(queryForm.shops.length);
  const groupByArea = groupRecordsByField(records, 'エリア');
  const area = Object.keys(groupByArea);
  // console.log('グループ出力テスト', groupByArea);

  return (
    <Stack spacing={2} alignItems="center">
      <Stack direction="row" spacing={2}>
        <YearMonthPicker setReportDate={setStartDate} reportDate={queryForm.startDate} label="開始年月" />
        <YearMonthPicker setReportDate={setEndDate} reportDate={queryForm.endDate} label="終了年月" />
      </Stack>
      <Stack spacing={2} minWidth={200}>
        <MultiSelect
          options={area}
          label="店舗"
          placeholder={isStoreSelected ? '店舗名' : '全店舗'}
          setOptions={updateSelectedStores}
        />
      </Stack>
      <Stack spacing={2} ref={componentRef}>
        <div>
          {Object.entries(groupByArea).map(([key, value]) => {
            if (!isStoreSelected || (queryForm.shops.indexOf(key) !== -1)) {
              // key(店舗名)がqueryForm.shops[]に含まれている時のみ、次の1行を実行する
              return <DonyuTashaTable key={key} records={value} title={key} startDate={queryForm.startDate} endDate={queryForm.endDate} />;
            }
          })}

        </div>
      </Stack>
    </Stack>
  );
};

IndexPerSite.propTypes = {
  componentRef: PropTypes.any
};

export default IndexPerSite;