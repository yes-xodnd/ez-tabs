import React from 'react';
import { ThemeProvider } from 'styled-components';

const defaultTheme = {
  color: {
    blue: 'royalblue',
  }
};

const Theme = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={defaultTheme} >{ children }</ThemeProvider>
);

export default Theme;