

import Fab from '@mui/material/Fab';

import NavigationIcon from '@mui/icons-material/Navigation';

export default function FloatingActionButtons() {
  return (


    <Fab
      sx={{position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 9999
      }}
      variant="extended"
    >
      <NavigationIcon sx={{mr: 1}} />
      問い合わせ
    </Fab>


  );
}