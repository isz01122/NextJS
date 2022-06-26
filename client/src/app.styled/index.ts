import 'antd/dist/antd.css';
import { createGlobalStyle } from 'styled-components';
import { resetCSS } from './reset';
import { color } from './color';

export const GlobalStyle = createGlobalStyle`
  :root {
    ${color}
  }
  
  ${resetCSS}
`;
