import React, { Component } from 'react';

import './App.css';
import ColorList from './ColorList';

class App extends Component {
  render() {
    return (
      <div className="a-app">
        <h1 className="a-title">CLRS</h1>
        <ColorList />
      </div>
    );
  }
}

export default App;
