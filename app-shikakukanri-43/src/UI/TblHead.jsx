import TblCell from './TblCell';

const TblHead = ({
  children, number,
}) => (
  <TblCell
    color="white"
    align={number ? 'right' : 'left'}
  >
    {children}
  </TblCell>
);

export default TblHead;
