import {TransformWrapper, TransformComponent} from 'react-zoom-pan-pinch';
import {Stack, IconButton} from '@mui/material';
import {Ref, ReactNode} from 'react';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {isMobile} from '@yumetetsu/library';


interface ZoomerProps {
  children ?: ReactNode,
  pdfWrapperRef ?: Ref<any>
}

export default function Zoomer({pdfWrapperRef, children} : ZoomerProps) {

  return (

    <TransformWrapper
      maxPositionY={355}
      ref={pdfWrapperRef}
      minScale={0.2}
    >

      {({zoomIn, zoomOut, resetTransform}) => (
        <>
          {
            !isMobile &&
              <Stack direction="row" spacing={2} justifyContent="center" justifySelf="center" alignItems="center">
                <IconButton aria-label="拡大" color="primary" onClick={() => zoomIn()}><ZoomInIcon /></IconButton>
                <IconButton aria-label="縮小" color="primary" onClick={() => zoomOut()}><ZoomOutIcon /></IconButton>
                <IconButton aria-label="リセット" color="primary" onClick={() => resetTransform()}><RestartAltIcon /></IconButton>
              </Stack>
          }
          <TransformComponent>
            {children}
          </TransformComponent>
        </>
      )}
    </TransformWrapper>

  );
}