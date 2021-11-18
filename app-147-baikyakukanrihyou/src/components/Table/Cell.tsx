import TableCell, {TableCellProps} from '@mui/material/TableCell';


const Cell = (props : TableCellProps) => {
  return (
    <TableCell
      sx={{
        padding: 1
      }}
      {...props}
    >
      {props.children}
    </TableCell>);
};

export default Cell;