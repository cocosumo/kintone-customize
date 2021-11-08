import {createTheme, ThemeProvider} from '@mui/material/styles';


interface BaseThemeProps {
  children: React.ReactNode
}

const theme = createTheme({
  typography: {
    // Tell MUI what the font-size on the html element is.
    fontFamily: '\'メイリオ\',\'Hiragino Kaku Gothic ProN\',Meiryo,sans-serif',
    caption: {
      color: '#808080'
    }
  },
});

export default function BaseTheme({children} : BaseThemeProps) {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}