import ReactDOM from 'react-dom';
import './printShowHandler.css';
import {Fragment} from 'react';

import Button from '../components/UI/Button';
//  import createPDF from "./printShow/createPDF";
import modifyPDF from './printShow/modifyPDF';
import printShowRootElement from './printShow/printShowRootElement';

let record;

const setRecord = (kintoneRecord) => {
  record = record || kintoneRecord;
};

const getRecord = () => record;

const windowOpen = async () => {
  let pdfWindow = window.open("");
  let pdfResult = await modifyPDF(getRecord());
  var file = new Blob([pdfResult], { type: 'application/pdf;base64' });
  var fileURL = URL.createObjectURL(file);
  //window.open(fileURL);
pdfWindow.document.write(`<iframe width='100%' height='100%' src=' ${fileURL} '></iframe>`);
  //console.log(pdf);
  
}

export const printShowHandler = (event) => {
  setRecord(event.record);
  
  ReactDOM.render(
      <Fragment>
         <Button onPrint={() => modifyPDF(getRecord(), window.open)}>Custom Print</Button>
        <Button onPrint={windowOpen}>Fuck</Button>
      </Fragment>, printShowRootElement());
};
