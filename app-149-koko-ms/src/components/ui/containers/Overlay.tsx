import styles from './overlay.module.css';
import DarkCocoTheme from './../../themes/DarkCocoTheme';

export default function Overlay({children}: Props) {
  return (
    <div className={styles.overlay}>
      <DarkCocoTheme>
        {children}
      </DarkCocoTheme>
    </div>
  );
}
