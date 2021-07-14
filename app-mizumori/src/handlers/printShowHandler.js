import ReactDOM from 'react-dom';
import './printShowHandler.css';

import Button from '../components/UI/Button';
//  import createPDF from "./printShow/createPDF";
import modifyPDF from './printShow/modifyPDF';
import printShowRootElement from './printShow/printShowRootElement';

let record;

const setRecord = (kintoneRecord) => {
  record = record || kintoneRecord;
};

const getRecord = () => record;

const printPDF = async () => {
  const pdfWindow = window.open('');
  const pdfResult = await modifyPDF(getRecord());
  const file = new Blob([pdfResult], { type: 'application/pdf;base64' });
  const fileURL = URL.createObjectURL(file);
  pdfWindow.document.write(
    `<iframe width='100%' height='100%' src=' ${fileURL} '></iframe>`,
  );
  // console.log(pdf);
};

export default printShowHandler = (event) => {
  setRecord(event.record);

  ReactDOM.render(
    <>
      <Button onPrint={printPDF}>Custom Print</Button>
    </>, printShowRootElement(),
  );
};
