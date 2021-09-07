import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  components: {
    MuiSnackbar: {
      styleOverrides: {
        anchorOriginTopCenter: {
          top: '10%',
        },
        anchorOriginBottomCenter: {
          bottom: '20%',
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
