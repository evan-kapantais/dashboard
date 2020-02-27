import React from 'react';

import './App.scss';

import Layout from './components/layout'
import Todos from './components/todos/todos'

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