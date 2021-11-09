

declare module '*.png' {
  const value: any;
  export default value;
}

interface Modal {
  isModalOpen : boolean,
  setIsModalOpen: (isOpen : boolean)=>any,
}

interface ModalProps extends Modal {
  HeaderComponent ?: React.ReactNode
  children ?: React.ReactNode
}

interface FileViewerProps extends Modal {

  url: string
}