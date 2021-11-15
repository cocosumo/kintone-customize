/* eslint-disable react/display-name */

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Cell from './Cell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Title from '../Headers/Title';
import React from 'react';

function createData(
  store : string,
  site: string,
  date :string,
  time: string,
  incharge: string,
  type: string,
) {
  return {store, site, date, time, incharge, type};
}

const rows = [
  createData('千種大久手店', 'イエウール', '2021-11-15', '9:00', '坪内 修', '一戸建て'),

];

const TableHankyo = React.forwardRef((_props, ref: any) => {

  return (
    <div style={{'width': '100%'}} ref={ref}>
      <Title>【豊田市エリア】 売却サイト反響管理表</Title>
      <TableContainer sx={{width: '100%'}} component={Paper}>
        <Table sx={{width: '100%'}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <Cell padding="normal">店舗</Cell>
              <Cell >媒体サイト</Cell>
              <Cell >反響日</Cell>
              <Cell>時間</Cell>
              <Cell>担当</Cell>
              <Cell>種別</Cell>
              <Cell>査定先住所</Cell>
              <Cell>課金外対象可否</Cell>
              <Cell>反響対応</Cell>
              <Cell>媒介獲得日</Cell>
              <Cell>その他（中止等理由）</Cell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.site + row.date}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                <Cell component="th" scope="row">
                  {row.store}
                </Cell>
                <Cell>{row.site}</Cell>
                <Cell>{row.date}</Cell>
                <Cell>{row.time}</Cell>
                <Cell>{row.incharge}</Cell>
                <Cell>{row.type}</Cell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
});

export default TableHankyo;
