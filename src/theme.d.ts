import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    appColor: {
      dark: string;
      darkBlue: string;
      darkGreen: string;
      darkGrey: string;
      green: string;
      light: string;
      lightGrey: string;
      white: string;
    };
  }

  interface PaletteOptions {
    appColor?: {
      dark: string;
      darkBlue: string;
      darkGreen: string;
      darkGrey: string;
      green: string;
      light: string;
      lightGrey: string;
      white: string;
    };
  }
}