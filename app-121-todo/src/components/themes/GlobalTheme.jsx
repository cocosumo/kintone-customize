import { createTheme, ThemeProvider } from '@mui/material/styles';
import { isMobile } from '../../../../kintone-api/api';

const theme = createTheme({
  typography: {
    htmlFontSize: isMobile() ? 10 : 14,
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
    MuiAlert: {
      styleOverrides: {
        root: {
          fontSize: 16,
        },
      },
    },
  },
});

const GlobalTheme = ({ children }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

export default GlobalTheme;
