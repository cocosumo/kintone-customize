import styles from './graphTitle.module.css';

interface GraphTitleProps {
  title: string
}

const GraphTitle = ({title}: GraphTitleProps) => {
  return <div className={styles.graphTitle}>{title}</div>;
};

export default GraphTitle;

