import FullScreenModal from '../modals/FullScreenModal';
import {useState, useReducer} from 'react';
import {Document, Page, pdfjs} from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
import PDFViewerHeader from './PDFViewerHeader';
import {Box} from '@mui/system';
import './PDFViewer.css';

interface PDFDocumentProxy {
  numPages: number
}

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

const PDFViewer = ({isModalOpen, setIsModalOpen, url} : PDFViewerProps) => {
  const [numberOfPages, setNumberOfPages] = useState<number | null>();
  const [state, dispatchScale] = useReducer(reducer, initialScale);

  // const [scale, setScale] = useState<number>(2);

  console.log(state);
  const onDocumentLoadSuccess = ({numPages} : PDFDocumentProxy) => {
    setNumberOfPages(numPages);
  };


  console.log('hello');
  return (

    <FullScreenModal
      {...{isModalOpen, setIsModalOpen}}
      HeaderComponent={<PDFViewerHeader dispatch={dispatchScale} />}
    >
      <Box >
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
        >

          {[...Array(numberOfPages)].map((_, i) => {
            return (
              <Page
                scale={state.scale}
                key={i}
                pageIndex={i}
              />);
          })}

        </Document>
      </Box>
      <p> {numberOfPages}</p>
    </FullScreenModal>);
};

export default PDFViewer;