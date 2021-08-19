import styles from './fullWidth.module.css';

const FullWidth = ({ children }) => (
  <div className={styles.fullWidth}>
    {children}
  </div>
);

export default FullWidth;
