import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Cell from './Cell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
import Title from '../Headers/Title';
import Box from '@mui/system/Box';
import CellHeader from './CellHeader';
import {groupRecordsByField} from '../../helpers/utils';
import {getHankyoRecords} from '../../backend/baikyakuHankyo';


interface TableSummaryProps {
  groupedRecords: {[key: string] : any}, // by area

}

const resolveGroupBySite = () : GroupedRecords[] => {
  const grouped = groupRecordsByField(getHankyoRecords(), '媒体サイト');

  const groupedArray = Object
    .entries(grouped)
    .map(([key, value]) => ({[key]: value}));
  // put others to last index.
  const others = groupedArray
    .filter((item, index) => {
      const isOthers = Object.keys(item)[0].includes('その他');
      if (isOthers) {
        groupedArray.splice(index, 1);
      }
      return isOthers;
    });

  groupedArray.push(...others);

  return groupedArray;
};


const TableSummary = ({groupedRecords}:TableSummaryProps) => {

  const totalHankyoRecord = getHankyoRecords().length;

  const areas = Object
    .keys(groupedRecords)
    .map((key)=>{
      return key;
    });

  const headerKeys : string[] = areas
    .filter(item => item.includes('エリア')).concat(
      areas.filter(item => !item.includes('エリア'))
    ).map(item=> item);

  const headerCells : React.ReactNode[] = headerKeys
    .map((item) => <CellHeader alignRight key={item}>{item}</CellHeader>);

  const groupedByAreaAndSite : {[key: string] : any} = Object
    .entries(groupedRecords).reduce((accu, curr) => {
      const [key, value] = curr;
      const groupedBySite = groupRecordsByField(value, '媒体サイト');

      return {...accu, ...{[key]: groupedBySite}};
    }, {});

  const groupedBySite = resolveGroupBySite();


  return (
    <Box className="area-container" margin={2} overflow="hidden">
      <Title>反響概要</Title>

      <TableContainer sx={{width: '100%'}}>
        <Table sx={{width: '100%'}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <CellHeader>サイト</CellHeader>
              {headerCells}
              <CellHeader alignRight>合計</CellHeader>
            </TableRow>
          </TableHead>

          <TableBody>

            {groupedBySite.map((item) => {
              const [site, hankyo] = Object.entries<any>(item)[0];

              return (
                <TableRow
                  key={site}
                  sx={{'&:last-child td, &:last-child th': {border: 0}}}
                >
                  <Cell>{site}</Cell>
                  {
                    headerKeys.map((store) => {
                      const hankyoPerArea = groupedByAreaAndSite[store][site];
                      const count = hankyoPerArea ? hankyoPerArea.length : 0;
                      return <Cell key={store}>{count}</Cell>;
                    })
                  }
                  <Cell bold>{hankyo.length}</Cell>
                </TableRow>);
            })}
            <TableRow
              sx={{
                '&:last-child td, &:last-child th': {border: 0},
                borderTop: '2px solid grey',
              }}
            >
              <Cell bold>合計</Cell>
              {
                headerKeys.map((store) => {

                  return <Cell bold key={store}>{groupedRecords[store].length}</Cell>;
                })
              }
              <Cell bold>{totalHankyoRecord}</Cell>
            </TableRow>

          </TableBody>
          <tfoot>
            <tr >
              <td
                className="table-footer"
                align="center"
                aria-colspan={12}
                colSpan={12}
              >
                反響概要
              </td>
            </tr>
          </tfoot>
        </Table>
      </TableContainer>
    </Box>);
};

export default TableSummary;