
interface Modal {
  isModalOpen : boolean,
  setIsModalOpen: (isOpen : boolean)=>any,

}

interface ModalProps extends Modal {
  HeaderComponent ?: React.ReactNode
  children ?: React.ReactNode,
  pdfWrapperRef ?: Ref
}

interface FileViewerProps extends Modal {

  url: string
}