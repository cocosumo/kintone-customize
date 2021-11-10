interface PDFDocumentProxy {
  numPages: number
}

interface PDFViewerAndroid {
  url : string,
  numberOfPages: number,
  pdfWrapperWidth ?: number,
  pdfWrapperHeight ?: number,
  onDocumentLoadSuccess : ({numPages} : PDFDocumentProxy)=>any
}
