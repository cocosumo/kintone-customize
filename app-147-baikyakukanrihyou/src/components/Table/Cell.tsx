import TableCell, {TableCellProps} from '@mui/material/TableCell';


const Cell = (props : TableCellProps) => {
  return (
    <TableCell
      sx={{
        p: '4px',
        fontSize: 12,
        width: 'fit-content',
        maxWidth: '150px',
        wordBreak: 'normal',
        overflowWrap: 'break-word'
      }}
      {...props}
    >
      {props.children}
    </TableCell>);
};

export default Cell;