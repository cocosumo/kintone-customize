
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {isMobile} from '@yumetetsu/library';

const background = '#434343';


const darkTheme = createTheme({
  typography: {
    // Tell MUI what's the font-size on the html element is.
    htmlFontSize: isMobile ? 10 : 18,
  },
  components: {
    MuiInputBase: {
      styleOverrides: {

        root: {

          backgroundColor: 'white'

        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: background
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          overflowY: 'auto'
        }
      }
    },
    MuiFab: {
      styleOverrides: {
        root: {
          background: background,
          ':hover': {
            background: background
          }
        }
      }
    }
  },
});

export default function EnableColorOnDarkAppBar({children}: Props) {
  console.log(isMobile);
  return (
    <ThemeProvider theme={darkTheme}>
      {children}
    </ThemeProvider>

  );
}