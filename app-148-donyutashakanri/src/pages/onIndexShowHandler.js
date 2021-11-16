import PrintButton from '../compornents/PrintButton';
import ReactDOM from 'react-dom';
import Table from '../compornents/Table';
import Header from '../compornents/Header';
import './index.css';

/* eslint-disable no-unused-vars */
const onIndexShowHandler = (event) => {
  const condition = kintone.app.getQueryCondition();
  console.log(condition);
  console.log('Index Page');

  // console.log('event', event);
  ReactDOM.render(
    <div>
      <PrintButton />
      <Header area={event.viewName} />
      <Table data={event.records} />
    </div>
    , document.getElementById('root')
  );

  /*
  ReactDOM.render(<Table>
    <tr>
      <th>Company</th>
      <th>Contact</th>
      <th>Country</th>
    </tr>
    <tr>
      <td>Alfreds Futterkiste</td>
      <td>Maria Anders</td>
      <td>Germany</td>
    </tr>
    <tr>
      <td>Centro comercial Moctezuma</td>
      <td>Francisco Chang</td>
      <td>Mexico</td>
    </tr>


  </Table>, document.getElementById('root')); */
};

export default onIndexShowHandler;
