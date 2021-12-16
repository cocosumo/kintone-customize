import FullScreenModal from '../modals/FullScreenModal';

const ImageViewer = ({isModalOpen, setIsModalOpen, url} : FileViewerProps) => {
  return (
    <FullScreenModal {...{isModalOpen, setIsModalOpen}}>
      <img width="100%" src={url} alt="" />
    </FullScreenModal>
  );
};

export default ImageViewer;