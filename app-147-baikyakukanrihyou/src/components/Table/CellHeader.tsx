/* eslint-disable import/named */
import TableCell, {TableCellBaseProps} from '@mui/material/TableCell';

interface CellHeaderProps extends TableCellBaseProps {
  alignRight?: boolean
}

const CellHeader = (props : CellHeaderProps) => {

  return (
    <TableCell
      sx={{
        p: '4px',
        textAlign: props.alignRight ? 'right' : 'left',
        fontWeight: 600,
      }}
    >
      {props.children}
    </TableCell>);
};

export default CellHeader;