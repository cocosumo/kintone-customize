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
  Object.entries(employeeCountPerStore).forEach(
    ([key, value]) => console.log(key, value),
  );
  return (
    <Container maxWidth="sm">
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>店舗</TableCell>
              <TableCell align="right">社員人数</TableCell>
              <TableCell align="right">必要な宅建士人数</TableCell>
              <TableCell align="right">宅建士人数</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
              <StyledTableCell align="right">{row.carbs}</StyledTableCell>
            </StyledTableRow>
          ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default RatioTable;
