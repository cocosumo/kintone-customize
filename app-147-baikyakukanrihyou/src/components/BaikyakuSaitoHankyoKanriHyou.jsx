import Grid from '@mui/material/Grid';
import {useRef} from 'react';
import ReactToPrint from 'react-to-print';
import PrintButton from './Buttons/PrintButton';
import Title from './Headers/Title';
import PropTypes from 'prop-types';
import TableHankyo from './Table/TableHankyo';


const BaikyakuSaitoHankyoKanriHyou = ({event}) => {
  const {type} = event;

  console.log(event, type);

  const componentRef = useRef();


  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <ReactToPrint
          trigger={() => <PrintButton />}
          content={() => componentRef.current}
        />
      </Grid>
      <Grid item>
        <Title>【豊田市エリア】 売却サイト反響管理表</Title>
        <TableHankyo />
      </Grid>
    </Grid>
  );
};

export default BaikyakuSaitoHankyoKanriHyou;

BaikyakuSaitoHankyoKanriHyou.propTypes = {
  event: PropTypes.object
};