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
import CellHead from './../../../../app-147-baikyakukanrihyou/src/components/Table/CellHeader';


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
                <CellHead>月</CellHead>
                {sites.map((key)=><CellHead key={key}>{key}</CellHead>)}
              </tr>
            </thead>
            <tbody>
              {cummulative.map(data => {
                const [key, value] = Object.entries(data)[0];
                const month = parseISO(key).getMonth() + 1;

                return (
                  <tr key={month}>

                    <CellHead>{month}</CellHead>

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
  componentRef: PropTypes.instanceOf(Element)
};

export default IndexCummulative;