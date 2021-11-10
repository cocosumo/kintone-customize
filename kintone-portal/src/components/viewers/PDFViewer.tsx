import FullScreenModal from '../modals/FullScreenModal';
import {useRef, useState} from 'react';
import PDFViewerAndroid from './PDFViewerAndroid';
// import PDFViewerAllOtherDevice from './PDFViewerAllOtherDevice';
// import {isAndroid} from '../../../utils';


/* const reducer = (state : any, action: any) => {
  switch (action.type) {
    case 'increment':
      return {scale: state.scale + 0.2};
    case 'decrement':
      return {scale: state.scale > 0.4 ? state.scale - 0.2 : state.scale};
    default:
      throw new Error();
  }
}; */


type WrapperComponent = {
  wrapperComponent: HTMLElement;
}

type TransformWrapper = {
  instance: WrapperComponent;
}

const PDFViewer = ({isModalOpen, setIsModalOpen, url} : FileViewerProps) => {
  const [numberOfPages, setNumberOfPages] = useState<number>(0);
  const pdfWrapperRef = useRef<TransformWrapper>();
  // const [state, dispatchScale] = useReducer(reducer, initialScale);

  const onDocumentLoadSuccess = ({numPages} : PDFDocumentProxy) => {
    console.log(numPages);
    setNumberOfPages(numPages);
  };
  const pdfWrapperEl = pdfWrapperRef.current?.instance?.wrapperComponent;
  const pdfWrapperWidth = pdfWrapperEl?.offsetWidth;
  const pdfWrapperHeight = pdfWrapperEl?.offsetHeight || 400;

  console.log(pdfWrapperWidth);

  return (

    <FullScreenModal
      {...{isModalOpen, setIsModalOpen, pdfWrapperRef}}
    >
      <PDFViewerAndroid {...{url, numberOfPages, onDocumentLoadSuccess, pdfWrapperHeight, pdfWrapperWidth}} />
      {/* {isAndroid && <PDFViewerAndroid {...{url, scale, numberOfPages, onDocumentLoadSuccess}} />}
      {!isAndroid && <PDFViewerAllOtherDevice {...{url}} />} */}

    </FullScreenModal>);
};

export default PDFViewer;