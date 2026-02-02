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
    subtitle1: {
      fontSize: '16px',
      '@media (max-width:600px)': {
        fontSize: '14px',
      },
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          '&.MuiContainer-maxWidthMd': {
            maxWidth: '1440px',
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

    MuiFilledInput: {
      styleOverrides: {

        root: {
          '&:before, &:hover:not(.Mui-disabled):before': {
            borderBottom: 'none',
          },
        },
      },
    },
  },
});