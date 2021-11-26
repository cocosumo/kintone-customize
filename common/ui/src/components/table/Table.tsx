import styles from './table.module.css';

export const Table = (props: Props) =>{
  const {border, marginAuto} = styles;

  const componentStyles = `${border} ${marginAuto} ` + props.className;

  return <table className={componentStyles}>{props.children}</table>;
};

export const CellHeader = (props : Props) => {

  const {border, cellPadding} = styles;

  const componentStyles = `${border} ${cellPadding} ` + props.className;

  return (
    <th className={componentStyles}>
      {props.children}
    </th>);
};

export const Cell = (props : Props) => {
  const {border, cellPadding} = styles;

  const componentStyles = `${border} ${cellPadding} ` + props.className;

  return (
    <td className={componentStyles} {...props}>
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
  const componentStyles = props.className;
  return (
    <tbody className={componentStyles}>
      {props.children}
    </tbody>);
};

export const TableHead = (props : Props) => {
  return (
    <thead className={props.className}>
      {props.children}
    </thead>);
};

export const TableFoot = (props : Props) => {
  return (
    <tfoot className={props.className}>
      {props.children}
    </tfoot>);
};