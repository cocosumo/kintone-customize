
import styles from './Button.module.css';

const Button = (props) => {
  return <button
    onClick={props.onPrint}
    id={props.id}
    className={`${styles.button} ${props.className || ''} `} >
    {props.children}
  </button>;
};

export default Button;
