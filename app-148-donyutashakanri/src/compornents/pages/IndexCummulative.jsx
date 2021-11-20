import {useEffect, useState} from 'react';
import YearPicker from '../datepickers/YearPicker';
import fetchDonyutashaRecordsByDate from '../../backend/donyutashakanri';
import {groupRecordsByField} from './../../../../app-147-baikyakukanrihyou/src/helpers/utils';
import './../../pageShowHandlers/index.css';
import {fiscalYearRange} from '../../helpers/time';
import {generateCummulative} from '../../helpers/utilities';
import {parseISO} from 'date-fns';
import {Stack} from '@mui/material';
import Title from '../typhograhies/Title';
import PropTypes from 'prop-types';
import CellHeader from './../../../../components/CellHeader';


const IndexCummulative = ({componentRef}) => {

  const [records, setRecords] = useState([]);
  const [reportDate, setReportDate] = useState(new Date());

  useEffect(()=>{
    fetchDonyutashaRecordsByDate(reportDate).then(resp => {
      setRecords(resp);
    });
  }, [reportDate]);


  const groupBySite = groupRecordsByField(records, '媒体サイト名');
  const sites = Object.keys(groupBySite);
  const fiscalYear = fiscalYearRange(reportDate);
  const cummulative = generateCummulative(fiscalYear.start, fiscalYear.end, groupBySite);

  return (
    <Stack spacing={2}>
      <YearPicker {...{setReportDate, reportDate}} />
      <Stack spacing={2} ref={componentRef}>
        <Title>導入他社数累計一覧</Title>
        <div>
          <table>
            <thead>
              <tr>
                <th>月</th>
                {sites.map((key)=><th key={key}>{key}</th>)}
              </tr>
            </thead>
            <tbody>
              {cummulative.map(data => {
                const [key, value] = Object.entries(data)[0];
                const month = parseISO(key).getMonth() + 1;

                return (
                  <tr key={month}>

                    <CellHeader>{month}</CellHeader>

                    {sites.map((site)=>{
                      return <td key={site}>{value[site]}</td>;
                    })}

                  </tr>);
              })}
            </tbody>
          </table>
        </div>
      </Stack>
    </Stack>
  );

};

IndexCummulative.propTypes = {
  componentRef: PropTypes.any
};

export default IndexCummulative;