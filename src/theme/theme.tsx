import { createTheme } from '@mui/material';

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 320,
      sm: 770,
      md: 1000,
      lg: 1440,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: '#344966',
      light: '#5d83b8',
      dark: '#243247'
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    h1: {
      fontSize: '40px',
      fontWeight: '700',
      color: '#0D1821',
      '@media (max-width:1000px)': {
        fontSize: '32px',
      },
    },
    subtitle1: {
      fontSize: '16px',
      fontWeight: '500',
      '@media (max-width:1000px)': {
        fontSize: '14px',
      },
    },
    subtitle2: {
      fontSize: '20px',
      fontWeight: '400',
      color: '#344966',
      '@media (max-width:834px)': {
        fontSize: '16px',
      },
    }
  },
  components: {

    MuiContainer: {
      styleOverrides: {
        root: {
          '&.MuiContainer-maxWidthMd': {
            maxWidth: '1280px',
          },
          '@media (min-width: 834px)': {
            padding: '0 15px',
          },
          '@media (min-width: 1440px)': {
            padding: '0 80px',
          },
        },
      },
    },
  },
});