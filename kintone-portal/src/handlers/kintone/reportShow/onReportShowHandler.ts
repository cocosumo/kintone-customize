import {renderPrint} from './reportDOMhelpers';


const onReportShowHandler = (event: any) => {
  console.log(event);
  renderPrint();

};

export default onReportShowHandler;