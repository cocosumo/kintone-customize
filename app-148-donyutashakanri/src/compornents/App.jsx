import PropTypes from 'prop-types';
import IndexPerStore from './pages/IndexPerStore';
import IndexCummulative from './pages/IndexCummulative';
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

        <div>
          <ReactToPrint
            trigger={() => <PrintButton onClick={window.print} />}
            content={() => componentRef.current}
          />
        </div>


        {!(isCummulativeView || isAllShopsView) && <IndexPerStore {...{event, componentRef}} />}

        {isCummulativeView && <IndexCummulative {...{componentRef}} /> }

        {isAllShopsView && <IndexAllStores {...{event, componentRef}} />}

      </Stack>
    </Container>
  );
};

App.propTypes = {
  event: PropTypes.object,
};


export default App;
