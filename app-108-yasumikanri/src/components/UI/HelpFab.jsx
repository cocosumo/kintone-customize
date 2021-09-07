import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';

const HelpFab = () => (
  <Box>
    <Fab style={{ padding: '8', position: 'fixed', zIndex: 99999 }} variant="extended" size="medium" color="primary" aria-label="add">
      <NavigationIcon sx={{ mr: 1 }} />
      Extended
    </Fab>
  </Box>
);

export default HelpFab;
