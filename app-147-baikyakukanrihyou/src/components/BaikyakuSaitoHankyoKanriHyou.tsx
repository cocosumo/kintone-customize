import Grid from '@mui/material/Grid';
import {useEffect, useRef, useState} from 'react';
import {useReactToPrint} from 'react-to-print';
import PrintButton from './Buttons/PrintButton';
import PropTypes from 'prop-types';
import {fetchBaikyakuHankyoGroupByArea} from '../backend/baikyakuHankyo';
import AreaPage from './Pages/AreaPages';


const BaikyakuSaitoHankyoKanriHyou = () => {
  const [groupedRecords, setGroupedRecords] = useState<GroupedRecords | null>(null);

  useEffect(()=> {
    fetchBaikyakuHankyoGroupByArea()
      .then((resp : GroupedRecords) => {
        setGroupedRecords(resp);
      });
  }, []);


  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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
        <div style={{'width': '100%'}} ref={componentRef}>
          {groupedRecords && <AreaPage {...{groupedRecords}} />}
        </div>
      </Grid>
    </Grid>
  );
};

export default BaikyakuSaitoHankyoKanriHyou;

BaikyakuSaitoHankyoKanriHyou.propTypes = {
  event: PropTypes.object
};