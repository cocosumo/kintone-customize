import TableCell, {TableCellProps} from '@mui/material/TableCell';


const CellHeader = (props : TableCellProps) => {
  return (
    <TableCell
      sx={{
        p: '4px',
        fontWeight: 600
      }}
      {...props}
    >
      {props.children}
    </TableCell>);
};

export default CellHeader;