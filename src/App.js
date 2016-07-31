import cn from 'classnames';
import React, { Component } from 'react';

import './App.css';
import ColorList from './ColorList';

class App extends Component {
  constructor(props, ctx) {
    super(props, ctx);
    this.state = {
      infoOpen: false,
    }
  }

  toggleInfo = () => {
    this.setState({
      infoOpen: !this.state.infoOpen,
    });
  }

  render() {
    return (
      <div className="a-app">
        <h1 className="a-title">c l r s</h1>
        <div className="a-content">
          <ColorList />
        </div>
        <div className={cn('a-footer', this.state.infoOpen && 'a-open')}>
          <div className="a-footer-content">
            <a href="http://giacomotag.io">Giacomo Tagliabue</a>
            &copy; {new Date().getFullYear()}
            {' — '}
            <a href="#" onClick={this.toggleInfo}>What's this?</a>
          </div>
          <div className="a-info">
            <p>
              An HSL-first color picker to build color palettes and compare values.
            </p>
            <p>
              The Colors are sorted by hue first and then lightness to better
              compare diffent shades. You can start by defining a primary hue
              and then experiment with different values of saturation and lightness.
            </p>
            <p><a href="https://en.wikipedia.org/wiki/HSL_and_HSV">What's HSL?</a></p>
            <p><a href="https://github.com/itajaja/clrs">source code</a></p>
            <p><a href="#" onClick={this.toggleInfo}>X</a></p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
