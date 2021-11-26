import FullScreenModal from '../modals/FullScreenModal';
import {useRef, useState} from 'react';
import PDFViewerAndroid from './PDFViewerAndroid';
import Button from '@mui/material/Button';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';


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
      {...{
        isModalOpen,
        setIsModalOpen,
        pdfWrapperRef,
        HeaderComponent: <Button startIcon={<CloudDownloadIcon />} />
      }}
    >
      <PDFViewerAndroid {...{url, numberOfPages, onDocumentLoadSuccess, pdfWrapperHeight, pdfWrapperWidth}} />

    </FullScreenModal>);
};

export default PDFViewer;