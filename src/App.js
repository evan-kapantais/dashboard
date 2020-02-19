import React from 'react';
import styled from 'styled-components'

import './App.scss';
import background from './images/julian-hochgesang-aG8iIT9_iqM-unsplash.jpg';
import Header from './components/header'
import Todos from './components/todos'

//TODO: add random background image from collection
//TODO: whitespace string in todos

const StyledApp = styled.div `
  height: 100vh;
  background: #555 url(${background}) no-repeat center / cover;
  color: #fff;
`

function App() {
  return (
    <StyledApp>
      <Header />
      <Todos />
    </StyledApp>
  );
}

export default App;