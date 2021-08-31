import { Container } from '@material-ui/core';

import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const RatioTable = ({
  employeeCountPerStore,
  takkenshiCountPerStore,
}) => {
  const row = [];
  Object.entries(employeeCountPerStore).forEach(([key, value]) => {
    const needCount = Math.ceil(value / 5);
    const takkenshiCount = takkenshiCountPerStore[key];
    const isEnough = takkenshiCount >= needCount;
    row.push(
      <TableRow sx={{ backgroundColor: isEnough ? 'white' : '#FFEBEE' }} key={key}>
        <TableCell>{key}</TableCell>
        <TableCell align="right">{value}</TableCell>
        <TableCell align="right">{needCount}</TableCell>
        <TableCell align="right">{takkenshiCount}</TableCell>
      </TableRow>,
    );
  });

  return (
    <Container maxWidth="sm">
      <TableContainer sx={{ margin: 2 }} component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#3498db', color: '#FFF' }}>
              <TableCell sx={{ color: 'white' }} component="th" scope="row">店舗</TableCell>
              <TableCell sx={{ color: 'white' }} align="right">社員人数</TableCell>
              <TableCell sx={{ color: 'white' }} align="right">必要な宅建士人数</TableCell>
              <TableCell sx={{ color: 'white' }} align="right">宅建士人数</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {row}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default RatioTable;
