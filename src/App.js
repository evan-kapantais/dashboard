import React from 'react';
import styled from 'styled-components'

import './App.scss';
import background from './images/julian-hochgesang-aG8iIT9_iqM-unsplash.jpg';

import Layout from './components/layout'
import Todos from './components/todos/todos'
import Weather from './components/weather'
import Budget from './components/budget/budget'

//TODO: add random background image from collection
//TODO: whitespace string in todos

function App() {
  return (
    <div className="App">
      <Layout>
        <Todos />
        {/* <Budget /> */}
      </Layout>
    </div>
  );
}

export default App;