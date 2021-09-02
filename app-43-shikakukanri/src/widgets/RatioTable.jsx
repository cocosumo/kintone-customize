import { Container, IconButton, Typography } from '@material-ui/core';

import React, { useState } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import PeopleIcon from '@material-ui/icons/People';
import DetailsPopper from '../UI/DetailsPopper';
import PeopleStack from '../contents/PeopleStack';
import TblCell from '../UI/TblCell';
import TblHead from '../UI/TblHead';

const RatioTable = ({
  employeeCountPerStore,
  takkenshiPerStore,
}) => {
  const [detailsOpen, setDetailsOpen] = useState();
  const [anchorEl, setAnchorEl] = useState();

  const onDetailsClickHandler = (el) => {
    setAnchorEl((prev) => {
      if (prev === el.currentTarget) {
        setDetailsOpen(false);
        return null;
      }
      setDetailsOpen(true);
      return el.currentTarget;
    });
  };

  const onCloseHandler = () => {
    setDetailsOpen(false);
    setAnchorEl(null);
  };

  const resolveColor = (takkenshiCount, needCount) => {
    if (takkenshiCount === needCount) {
      return 'white';
    } if (takkenshiCount > needCount) {
      return '#DDEEDF';
    }
    return '#FFEBEE';
  };

  const rows = [];
  Object.entries(employeeCountPerStore).forEach(([key, value]) => {
    const needCount = Math.ceil(value / 5);
    const takkenshiCount = takkenshiPerStore[key]?.length || 0;
    const isWithTakkenshi = Boolean(takkenshiCount);
    const bgColor = resolveColor(takkenshiCount, needCount);
    rows.push(
      <TableRow sx={{ backgroundColor: bgColor }} key={key}>
        <TblCell>{key}</TblCell>
        <TblCell align="right">{value}</TblCell>
        <TblCell align="right">{needCount}</TblCell>
        <TblCell align="right">

          {isWithTakkenshi && (
          <IconButton
            onClick={onDetailsClickHandler}
            aria-label={key}
            size="large"
          >
            <Typography fontSize={20} fontWeight={700} mr={1}>{takkenshiCount}</Typography>
            <PeopleIcon aria-label={key} />
          </IconButton>
          )}
        </TblCell>
      </TableRow>,
    );
  });

  return (
    <Container maxWidth="sm">
      <TableContainer sx={{ mt: 2 }} component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#3498db', color: '#FFF' }}>
              <TblHead>店舗</TblHead>
              <TblHead number>
                社員
                <br />
                人数
              </TblHead>
              <TblHead number>
                必要
                <br />
                人数
              </TblHead>
              <TblHead number>
                宅建士
                <br />
                人数
              </TblHead>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows}
          </TableBody>
        </Table>
      </TableContainer>
      {detailsOpen && (

        <DetailsPopper {...{ detailsOpen, anchorEl, onCloseHandler }}>
          <PeopleStack records={takkenshiPerStore[anchorEl?.ariaLabel]} />
        </DetailsPopper>

      )}
    </Container>
  );
};

export default RatioTable;
