import Grid from '@mui/material/Grid';
import {useRef} from 'react';
import {useReactToPrint} from 'react-to-print';
import PrintButton from './Buttons/PrintButton';

import PropTypes from 'prop-types';
import TableHankyo from './Table/TableHankyo';

interface BaikyakuSaitoHankyoKanriHyouProps {
  event: IndexEvent,
}

const BaikyakuSaitoHankyoKanriHyou = ({event} : BaikyakuSaitoHankyoKanriHyouProps) => {
  const {type} = event;
  const handlePrint = useReactToPrint({

    content: () => componentRef.current,
  });

  console.log(event, type, 'hello');

  const componentRef = useRef<HTMLDivElement>(null);


  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <PrintButton onPrint={handlePrint} />
      </Grid>
      <Grid item>
        <TableHankyo ref={componentRef} />
      </Grid>
    </Grid>
  );
};

export default BaikyakuSaitoHankyoKanriHyou;

BaikyakuSaitoHankyoKanriHyou.propTypes = {
  event: PropTypes.object
};