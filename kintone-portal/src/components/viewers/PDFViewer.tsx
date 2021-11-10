import FullScreenModal from '../modals/FullScreenModal';
import {useState, useReducer} from 'react';

import PDFViewerHeader from './PDFViewerHeader';

import PDFViewerAndroid from './PDFViewerAndroid';
// import PDFViewerAllOtherDevice from './PDFViewerAllOtherDevice';
// import {isAndroid} from '../../../utils';


const initialScale = {scale: 1};

const reducer = (state : any, action: any) => {
  switch (action.type) {
    case 'increment':
      return {scale: state.scale + 0.2};
    case 'decrement':
      return {scale: state.scale > 0.4 ? state.scale - 0.2 : state.scale};
    default:
      throw new Error();
  }
};


const PDFViewer = ({isModalOpen, setIsModalOpen, url} : FileViewerProps) => {
  const [numberOfPages, setNumberOfPages] = useState<number>(0);
  const [state, dispatchScale] = useReducer(reducer, initialScale);

  const onDocumentLoadSuccess = ({numPages} : PDFDocumentProxy) => {
    setNumberOfPages(numPages);
  };


  const {scale} = state;
  return (

    <FullScreenModal
      {...{isModalOpen, setIsModalOpen}}
      HeaderComponent={
        <PDFViewerHeader dispatch={dispatchScale} />
      }
    >
      <PDFViewerAndroid {...{url, scale, numberOfPages, onDocumentLoadSuccess}} />
      {/* {isAndroid && <PDFViewerAndroid {...{url, scale, numberOfPages, onDocumentLoadSuccess}} />}
      {!isAndroid && <PDFViewerAllOtherDevice {...{url}} />} */}

    </FullScreenModal>);
};

export default PDFViewer;