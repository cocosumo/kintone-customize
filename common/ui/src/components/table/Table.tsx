import styles from './table.module.css';

export const Table = ({children}: Props) =>{
  return <table className={styles.table}>{children}</table>;
};

export const CellHeader = (props : Props) => {
  return (
    <th className={styles.cellheader}>
      {props.children}
    </th>);
};

export const Cell = (props : Props) => {
  return (
    <td className={styles.cell}>
      {props.children}
    </td>);
};

export const Row = (props : Props) => {
  return (
    <tr>
      {props.children}
    </tr>);
};

export const TableBody = (props : Props) => {
  return (
    <tbody>
      {props.children}
    </tbody>);
};

export const TableHead = (props : Props) => {
  return (
    <thead>
      {props.children}
    </thead>);
};

export const TableFoot = (props : Props) => {
  return (
    <tfoot>
      {props.children}
    </tfoot>);
};