
import ReactDOM from "react-dom";
import TableToolTip from "./src/components/Layout/TableToolTip";

//import MyImage from './assets/dog.jpg';
//import './index.css';

(function () {
  "use strict";

  const App = () => {
    return (
      <div>
        <TableToolTip/>
        <div>Spacer</div>
      </div>
    );
  };

  const App2 = () => {
    return (
      <div>
        <div> Information</div>
      </div>
    );
  };


  const recordView = (event) =>{
      console.log("welcome to react");
      console.log(event);
      ReactDOM.render(<App />, document.querySelector("#user-js-spacer"));
      ReactDOM.render(<App2 />, document.querySelector("#user-js-Information"));
  }; 

  kintone.events.on([
    'app.record.detail.show',
    'mobile.app.record.detail.show',  
    'app.record.edit.show',
    'mobile.app.record.edit.show',
    'app.record.create.show',
    'mobile.app.record.create.show'
  ], recordView);
})();





