import styles from './overlay.module.css';

export default function Overlay({children}: Props) {
  return (<div className={styles.overlay}>{children}</div>);
}
