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

export const printShowHandler = (event) => {
  setRecord(event.record);
  let pdfWindow = window.open("https://www.google.com", "_blank");
  ReactDOM.render(
      <Fragment>
        <Button onPrint={() => modifyPDF(getRecord(), pdfWindow)}>Custom Print</Button>
      </Fragment>, printShowRootElement());
};
