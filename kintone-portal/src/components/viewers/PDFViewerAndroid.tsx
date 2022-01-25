import {Document, Page, pdfjs} from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
import {Paper, Typography} from '@mui/material';
import './PDFViewer.css';
import {useState} from 'react';


const PleaseWait = () => {
  return <div>PLEASE WAIT</div>;
};

const PDFViewerAndroid = ({
  url,
  numberOfPages,
  pdfWrapperWidth,
  onDocumentLoadSuccess
} : PDFViewerAndroid) => {

  const [isDragging, setIsDragging] = useState(false);


  return (
    <div className={`cursor-${isDragging ? 'grabbing' : 'grab'}`} onMouseDown={()=>setIsDragging(true)} onMouseUp={()=>setIsDragging(false)}>
      <Document
        file={url}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {[...Array(numberOfPages)].map((_, i) => {
          return (
            <Paper
              sx={{
                width: 'fit-content',
                p: 2,
                m: 2
              }}
              key={i}
            >

              <Page
                loading={<PleaseWait />}
                scale={1}
                width={pdfWrapperWidth}
                pageNumber={i + 1}
                renderTextLayer={false}

              />
              <Typography textAlign="center">ページ {numberOfPages} の {i + 1}</Typography>

            </Paper>
          );
        }
        )}
      </Document>
    </div>
  );
};

export default PDFViewerAndroid;