import ReactDOM from "react-dom";
import './printShowHandler.css';
import { Fragment } from 'react';

import Button from '../components/UI/Button';
import printEstimate from "./printShow/printEstimate";
import printShowRootElement from "./printShow/printShowRootElement";


export const printShowHandler = (event) => {
     ReactDOM.render(
        <Fragment>
            <Button onPrint={printEstimate}>Custom Print</Button>
        </Fragment>, printShowRootElement()); 
};