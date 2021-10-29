import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {

    colors: {
      main: string;
      mainLight: string;
      mainDark: string;
      danger: string;
      hover: string;
    };
  }
}