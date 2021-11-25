import {useEffect, useState} from 'react';
import YearPicker from '../datepickers/YearPicker';
import fetchDonyutashaRecordsByDate from '../../backend/donyutashakanri';
import {groupRecordsByField} from '../../../../app-147-baikyakukanrihyou/src/helpers/utils';
import './../../pageShowHandlers/index.css';
import {fiscalYearRange} from '../../helpers/time';
import {generateTotal} from '../../helpers/utilities';
import {parseISO} from 'date-fns';
import {Stack} from '@mui/material';
import Title from '../typhograhies/Title';
import PropTypes from 'prop-types';
import {CellHeader, Cell, Table, Row, TableHead, TableBody} from '@yumetetsu/ui';


const IndexPerSite = ({componentRef}) => {

  const [records, setRecords] = useState([]);
  const [reportDate, setReportDate] = useState(new Date());

  useEffect(()=>{
    fetchDonyutashaRecordsByDate(reportDate).then(resp => {
      setRecords(resp);
    });
  }, [reportDate]);


  const groupBySite = groupRecordsByField(records, '媒体サイト名');

  console.log('グループ出力テスト', groupBySite);

  const sites = Object.keys(groupBySite);

  const fiscalYear = fiscalYearRange(reportDate);
  const cummulative = generateTotal(fiscalYear.start, fiscalYear.end, groupBySite);

  return (
    <Stack spacing={2}>
      <YearPicker {...{setReportDate, reportDate}} />
      <Stack spacing={2} ref={componentRef}>
        <Title>導入他社数一覧</Title>
        <div>
          <Table>
            <TableHead>
              <Row>
                <CellHeader>月</CellHeader>
                {sites.map((key)=><CellHeader key={key}>{key}</CellHeader>)}
              </Row>
            </TableHead>
            <TableBody>
              {cummulative.map(data => {
                const [key, value] = Object.entries(data)[0];
                const month = parseISO(key).getMonth() + 1;

                return (
                  <Row key={month}>

                    <Cell>{month}</Cell>

                    {sites.map((site)=>{
                      return <Cell key={site}>{value[site]}</Cell>;
                    })}

                  </Row>);
              })}
            </TableBody>
          </Table>
        </div>
      </Stack>
    </Stack>
  );

};

IndexPerSite.propTypes = {
  componentRef: PropTypes.any
};

export default IndexPerSite;