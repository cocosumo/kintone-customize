import styles from './Button.module.css';

const Button = ({
  onClickHandler, className, id, children,
}) => (
  <button
    type="button"
    onClick={onClickHandler}
    id={id}
    className={`${styles.button} ${className || ''} `}
  >
    {children}
  </button>
);

export default Button;
