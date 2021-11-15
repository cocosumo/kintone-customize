import {Button} from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import ReactDOM from 'react-dom';
import Table from '../compornents/Table';
import Header from '../compornents/Header';
import './index.css';

/* eslint-disable no-unused-vars */
const onIndexShowHandler = (event) => {
  const condition = kintone.app.getQueryCondition();
  console.log(condition);
  console.log('Index Page');

  ReactDOM.render(
    <Button
      variant="contained"
      startIcon={<PrintIcon />}
    >
      印刷
    </Button>, document.getElementById('root'),
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
