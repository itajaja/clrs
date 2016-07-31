import React, { Component } from 'react';
import FlipMove from 'react-flip-move';
import { connect } from 'react-redux'
import tc from 'tinycolor2';

import './ColorList.css';
import ColorListItem from './ColorListItem';

const colorSorter = ({ color: a }, { color: b }) => {
  if (a.h > b.h) return 1;
  else if (b.h > a.h) return -1;
  else if(a.l >= b.l) return 1;
  else return -1;
};

class ColorList extends Component {
  render() {
    const { onAddColor, colors } = this.props;

    const sortedColors = [];
    for (let id in colors) {
      if(colors.hasOwnProperty(id)) {
        sortedColors.push(colors[id]);
      }
    }
    sortedColors.sort(colorSorter);

    return (
      <div>
        <div onClick={onAddColor} className="cl-add-color-btn">
          Add color
        </div>
        <div className="cl-header">
          <span>H</span>
          <span>S</span>
          <span>L</span>
          <span>R</span>
          <span>G</span>
          <span>B</span>
        </div>
        <FlipMove enterAnimation="fade" leaveAnimation="fade" duration="500">
          {sortedColors.map(({ color, id }) =>
            <ColorListItem color={color} key={id} id={id}/>
          )}
        </FlipMove>
      </div>
    );
  }
}

export default connect(
  ({ colors }) => ({ colors }),
  d => ({ onAddColor: () => d({ type: 'ADD_COLOR', color: tc('#B2C6C6').toHsl() }) })
)(ColorList);
