import { createTheme } from '@mui/material';

import { baseStyles } from './base-styles.ts';
import { fonts } from './fonts.ts';

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
      dark: '#243247',
    },
    secondary: {
      main: '#0D1821',
      light: '#213c52',
      dark: '#010203',
    },
    appColor: {
      dark: '#0D1821',
      darkBlue: '#344966',
      darkGreen: '#8D9F4F',
      darkGrey: '#B9BAC3',
      green: '#BFCC94',
      light: '#F0F4EF',
      lightGrey: '#D6D8E7',
      white: '#FFFFFF'
    }
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

    h2: {
      fontSize: '20px',
      fontWeight: '400',
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
    MuiCssBaseline: {
      styleOverrides: [baseStyles, fonts].join(' '),
    },
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
  },
});