
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

export default function TableHankyo() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>店舗</TableCell>
            <TableCell align="right">媒体サイト</TableCell>
            <TableCell align="right">反響日</TableCell>
            <TableCell align="right">時間</TableCell>
            <TableCell align="right">担当</TableCell>
            <TableCell align="right">種別</TableCell>
            <TableCell align="right">査定先住所</TableCell>
            <TableCell align="right">課金外対象可否</TableCell>
            <TableCell align="right">反響対応</TableCell>
            <TableCell align="right">媒介獲得日</TableCell>
            <TableCell align="right">その他（中止等理由）</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.site + row.date}
              sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
              <TableCell component="th" scope="row">
                {row.store}
              </TableCell>
              <TableCell align="right">{row.site}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.time}</TableCell>
              <TableCell align="right">{row.incharge}</TableCell>
              <TableCell align="right">{row.type}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
