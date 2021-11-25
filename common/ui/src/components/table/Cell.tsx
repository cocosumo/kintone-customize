
// import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import styles from './cell.module.css';


const CellHeader = (props : Props) => {

  return (
    <th className={styles.cellheader}>
      {props.children}
    </th>);
};

export default CellHeader;

CellHeader.propTypes = {
  alignRight: PropTypes.bool,
  children: PropTypes.any
};