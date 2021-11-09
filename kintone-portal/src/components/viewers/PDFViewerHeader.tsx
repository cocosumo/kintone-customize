
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

interface ButtonProps {
  onClick?: ()=>any

}

interface PDFViewHeaderProps {
  dispatch: any
  setIsModalOpen?: (isOpen: boolean)=>any
}

const ZoomIn = ({onClick} : ButtonProps) => (
  <IconButton size="large" color="primary" aria-label="zoom in" component="span" {...{onClick}}>
    <ZoomInIcon />
  </IconButton>);

const ZoomOut = ({onClick} : ButtonProps) =>(
  <IconButton size="large" color="primary" aria-label="zoom out" component="span" {...{onClick}}>
    <ZoomOutIcon />
  </IconButton>);

const PDFViewerHeader = ({dispatch} : PDFViewHeaderProps) => {
  return (

    <Stack spacing={2} direction="row">
      <ZoomIn onClick={()=> dispatch({type: 'increment'})} />
      <ZoomOut onClick={()=> dispatch({type: 'decrement'})} />
    </Stack>

  );
};

export default PDFViewerHeader;