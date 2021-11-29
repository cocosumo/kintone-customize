import {useEffect, useState} from 'react';
import YearMonthPicker from '../datepickers/YearMonthPicker';
import {fetchDonyutashaRecords} from '../../backend/donyutashakanri';
import {groupRecordsByField} from '../../../../app-147-baikyakukanrihyou/src/helpers/utils';
import './../../pageShowHandlers/index.css';
// import {fiscalYearRange} from '../../helpers/time';
// import {generateTotal} from '../../helpers/utilities';
import {subYears} from 'date-fns';
import {Stack} from '@mui/material';
import PropTypes from 'prop-types';
import MultiSelect from '../select/MultiSelect';
import DonyuTashaTable from '../Table/DonyuTashaTable';

const IndexPerSite = ({componentRef}) => {

  const [records, setRecords] = useState([]);
  /* const [reportDate, setReportDate] = useState(new Date()); */
  const [queryForm, setQueryForm] = useState({endDate: new Date(), startDate: subYears(new Date(), 1), shops: []});

  useEffect(()=>{
    fetchDonyutashaRecords(queryForm).then(resp => {
      console.log('test', resp, queryForm);
      setRecords(resp);
    });
  }, [queryForm]);

  const groupByArea = groupRecordsByField(records, 'エリア');

  console.log('グループ出力テスト', groupByArea);

  const area = Object.keys(groupByArea);

  const isStoreSelected = Boolean(queryForm.shops.length);
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


  return (
    <Stack spacing={2}>
      <YearMonthPicker setReportDate={setStartDate} reportDate={queryForm.startDate} label="開始年月" />
      <YearMonthPicker setReportDate={setEndDate} reportDate={queryForm.endDate} label="終了年月" />
      <MultiSelect
        options={area}
        label="店舗"
        placeholder={isStoreSelected ? '店舗名' : '全店舗'}
        setOptions={updateSelectedStores}
      />
      <Stack spacing={2} ref={componentRef}>
        <div>
          {Object.entries(groupByArea).map(([key, value]) => {
            console.log(key, value);
            return <DonyuTashaTable key={key} records={value} title={key} startDate={queryForm.startDate} endDate={queryForm.endDate} />;
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