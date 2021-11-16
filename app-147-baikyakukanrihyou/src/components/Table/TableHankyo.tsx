/* eslint-disable react/display-name */

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Cell from './Cell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Title from '../Headers/Title';

import './TableHankyo.css';
import Box from '@mui/system/Box';

interface TableHankyoProps {
  title: string
  records: KintoneTypes.Data[]
}


const TableHankyo = ({title, records}: TableHankyoProps) => {


  return (
    <Box padding={1}>
      <Title>【{title}】 売却サイト反響管理表</Title>

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
            {records.map((row) => (
              <TableRow
                key={row.反響受付日.value + row.媒体サイト.value}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                <Cell component="th" scope="row">
                  {row.受付店舗.value}
                </Cell>
                <Cell>{row.媒体サイト.value}</Cell>
                <Cell>{row.反響受付日.value}</Cell>
                <Cell>{row.受付時刻.value}</Cell>
                <Cell>{row.営業担当.value}</Cell>
                <Cell>{row.種別.value}</Cell>
                <Cell>{row.査定先住所.value}</Cell>
                <Cell>{row.課金対象.value}</Cell>
                <Cell>{row.反響対応.value}</Cell>
                <Cell>{row.媒介獲得日.value}</Cell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <footer />
    </Box>
  );
};

export default TableHankyo;
