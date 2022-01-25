

import {createTheme, ThemeProvider} from '@mui/material/styles';

import {isMobile} from '@yumetetsu/library';


const theme = createTheme({
  typography: {
    htmlFontSize: isMobile ? 10 : 18
  },

});

export default function CustomTheme({children}: CustomContainer) {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}