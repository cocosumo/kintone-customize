import {useEffect, useState} from 'react';
import YearPicker from '../datepickers/YearPicker';
import fetchDonyutashaRecordsByDate from '../../backend/donyutashakanri';
import {groupRecordsByField} from './../../../../app-147-baikyakukanrihyou/src/helpers/utils';
import './../../pageShowHandlers/index.css';
import {fiscalYearRange} from '../../helpers/time';


const IndexCummulative = () => {

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

  const generateCummulative = () => {
    // calculate cummulative and return as object
  };


  return (
    <div>
      <YearPicker {...{setReportDate, reportDate}} />
      <table>
        <thead>
          <tr>
            {sites.map((key)=><th key={key}>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          Hello
        </tbody>
      </table>
    </div>
  );

};

export default IndexCummulative;