import FullScreenModal from '../modals/FullScreenModal';
import {useRef, useState} from 'react';
import PDFViewerAndroid from './PDFViewerAndroid';
import IconButton from '@mui/material/IconButton';
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
  console.log(url);

  const onDocumentLoadSuccess = ({numPages} : PDFDocumentProxy) => {
    setNumberOfPages(numPages);
  };
  const pdfWrapperEl = pdfWrapperRef.current?.instance?.wrapperComponent;
  const pdfWrapperWidth = pdfWrapperEl?.offsetWidth;
  const pdfWrapperHeight = pdfWrapperEl?.offsetHeight || 400;

  return (
    <FullScreenModal
      {...{
        isModalOpen,
        setIsModalOpen,
        pdfWrapperRef,
        HeaderComponent: <IconButton color="primary"><CloudDownloadIcon /></IconButton>
      }}
    >
      <PDFViewerAndroid {...{url, numberOfPages, onDocumentLoadSuccess, pdfWrapperHeight, pdfWrapperWidth}} />

    </FullScreenModal>);
};

export default PDFViewer;