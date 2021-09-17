import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    htmlFontSize: '1rem',
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
    MuiTextField: {
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
