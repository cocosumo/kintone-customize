
interface T {
  url: string
}

const PDFViewerAllOtherDevice = ({url} : T) => {
  return <iframe title="PDF" src={url} width="100%" height="500px" />;
};

export default PDFViewerAllOtherDevice;