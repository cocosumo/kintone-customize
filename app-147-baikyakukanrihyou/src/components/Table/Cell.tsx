import TableCell, {TableCellProps} from '@mui/material/TableCell';

interface CellProps extends TableCellProps {
  bold?: boolean
}

const Cell = (props : CellProps) => {

  const bold = props.bold ? 600 : 'normal';
  const align = typeof props.children === 'number' ? 'right' : 'left';
  const content = props.children === 0 ? '-' : props.children;

  return (
    <TableCell
      sx={{
        p: '4px',
        textAlign: align,
        fontSize: 12,
        width: 'fit-content',
        maxWidth: '150px',
        wordBreak: 'normal',
        overflowWrap: 'break-word',
        fontWeight: bold
      }}
    >
      {content}
    </TableCell>);
};

export default Cell;