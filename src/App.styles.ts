import styled, { createGlobalStyle } from 'styled-components';
import BGImage from './images/car.png';

export const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0 20px;
    display: flex;
    justify-content: center;
  }

  body:before {
    position: absolute;
    z-index: -9999;
    background-image: url(${BGImage});
    background-size: cover;
    filter: blur(5px);
    content: '';
    height: 100%;
    width: 100%;
  }

  * {
    box-sizing: border-box;
  }

  font-familiy: 'Catamaran' sans-serif;
`;


export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    color: #fff;
  }

  .score {
    color: #320;
    font-size: 3.5rem;
    font-weight: 800;
    margin: 0;
    background-clip: text;
    background: linear-gradient(180deg, #c8d, #f01);
    background-size: 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
  }

  h1 {
    font-family: Fascinate Inline, Hattenscheweiler, 'Arial Narrow bold', sans-serif;
    background-image: linear-gradient(180deg, #fff, #87f1ff);
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    filter: drop-shadow(2px 2px #0085a3);
    font-size: 70px;
    font-weight: 400;
    text-align: center;
  }

  .start, .next {
    cursor: pointer;
    background: linear-gradient(180deg, #fff, #ffcc91);
    border: 2px solid #d38558;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    height: 40px;
    margin: 20px 0;
    padding: 0 40px;
  }

  .start {
    max-width: 200px;
  }
`
