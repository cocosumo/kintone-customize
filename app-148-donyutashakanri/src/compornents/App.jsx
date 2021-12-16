import PropTypes from 'prop-types';
import IndexPerStore from './pages/IndexPerStore';
import IndexPerSite from './pages/IndexPerSite';
import ReactToPrint from 'react-to-print';
import PrintButton from './PrintButton';
import IndexAllStores from './pages/IndexAllStores';

import Stack from '@mui/material/Stack';
import {Container} from '@mui/material';
import {useRef} from 'react';

const App = ({event}) => {
  const componentRef = useRef();

  const {viewId} = event;
  const isCummulativeView = viewId === 5533648;
  const isAllShopsView = viewId === 5533614;

  return (
    <Container>
      <Stack mt={2} spacing={2}>

        {!(window.navigator.userAgent.includes('kintone_mobile')) &&
        <div>
          <ReactToPrint
            trigger={() => <PrintButton onClick={window.print} />}
            content={() => componentRef.current}
          />
        </div>}

        {!(isCummulativeView || isAllShopsView) && <IndexPerStore {...{event, componentRef}} />}

        {isCummulativeView && <IndexPerSite {...{componentRef}} /> }

        {isAllShopsView && <IndexAllStores {...{componentRef}} />}

      </Stack>
    </Container>
  );
};

App.propTypes = {
  event: PropTypes.object,
};


export default App;
