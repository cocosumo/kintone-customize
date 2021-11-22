import {ThemeProvider, createTheme} from '@mui/material';
import {isMobile} from '../../../../kintone-api/api';

const theme = createTheme({
  typography: {
    htmlFontSize: isMobile() ? 10 : 12
  },
  components: {
    MuiSnackbar: {
      styleOverrides: {
        anchorOriginTopCenter: {
          top: '10%',
        },
        anchorOriginBottomCenter: {
          bottom: '10%',
        },
      },
    },
  },
});

const GlobalTheme = ({children}) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

export default GlobalTheme;
