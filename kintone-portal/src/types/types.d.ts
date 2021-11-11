

interface Modal {
  isModalOpen : boolean,
  setIsModalOpen: (isOpen : boolean)=>any,

}

interface ModalProps extends Modal {
  HeaderComponent ?: React.ReactNode
  children ?: React.ReactNode,
  ref ?: Ref
}

interface FileViewerProps extends Modal {

  url: string
}