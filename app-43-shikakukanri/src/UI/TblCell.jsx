import { TableCell } from '@material-ui/core';

const TblCell = ({
  component, children, align, maxWidth, color,
}) => (
  <TableCell
    style={{
      color: [color], fontSize: 16, padding: 16, maxWidth: [maxWidth],
    }}
    component={component}
    align={align}
  >
    {children}
  </TableCell>
);

export default TblCell;
