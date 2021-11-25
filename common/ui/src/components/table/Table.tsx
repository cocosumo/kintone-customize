import styles from './table.module.css';

export const Table = ({children}: Props) =>{
  const {border, marginAuto} = styles;

  const componentStyles = `${border} ${marginAuto}`;

  return <table className={componentStyles}>{children}</table>;
};

export const CellHeader = (props : Props) => {

  const {border, cellPadding} = styles;

  const componentStyles = `${border} ${cellPadding}`;

  return (
    <th className={componentStyles}>
      {props.children}
    </th>);
};

export const Cell = (props : Props) => {
  const {border, cellPadding} = styles;

  const componentStyles = `${border} ${cellPadding}`;

  return (
    <td className={componentStyles}>
      {props.children}
    </td>);
};

export const Row = (props : Props) => {
  return (
    <tr className={styles.border}>
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