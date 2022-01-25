
import styles from './printButton.module.css';
import PrintIcon from '@mui/icons-material/Print';
import printHtmlBlock from 'print-html-block';
import {Props} from '../containers/Props.type';

const PrintGraphButton: React.FC<Props> = (props) => {

  const handlePrint = () => {
    printHtmlBlock('#report-view-gaia', {importStyle: true});
  };

  return (
    <button
      onClick={handlePrint}
      className={`${styles.toolBarButton}`}
      {...{props}}
    >
      <PrintIcon />
    </button>);
};

export default PrintGraphButton;