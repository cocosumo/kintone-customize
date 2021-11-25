

import styles from './cellHeader.module.css';


const CellHeader = (props : Props) => {

  return (
    <th className={styles.cellheader}>
      {props.children}
    </th>);
};

export default CellHeader;