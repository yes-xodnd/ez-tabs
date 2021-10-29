import React from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';

// const main = 'hsl(172, 79%, 29%)';
const main = 'hsl(213, 81%, 52%)';

const defaultTheme: DefaultTheme = {
  colors: {
    main: main,
    mainLight: changeHSL(main, [0, 0, 10]),
    mainDark: changeHSL(main, [0, 0, -10]),
    danger: 'crimson',
    hover: 'hsl(213, 20%, 97%)'
  }
};

const Theme = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={defaultTheme} >{ children }</ThemeProvider>
);

export default Theme;

function changeHSL (hsl: string, options: [number, number, number]) {
  const nums = hsl.match(/[0-9]+/g) as [string, string, string];
  const next = nums
    .map(v => Number(v))
    .map((v, i) => v + options[i]);

  return `hsl(${next[0]}, ${next[1]}%, ${next[2]}%)`;
}