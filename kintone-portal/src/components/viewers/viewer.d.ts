interface PDFDocumentProxy {
  numPages: number
}

interface PDFViewerAndroid {
  url : string,
  numberOfPages: number,
  scale: number,
  onDocumentLoadSuccess : ({numPages} : PDFDocumentProxy)=>any
}
