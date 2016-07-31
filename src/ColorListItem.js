import cn from 'classnames';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import tc from 'tinycolor2';

import CcInput from './CcInput';
import './ColorListItem.css';

const toPercent = v => v * 100;
const toFloat = v => v / 100;

class ColorListItem extends Component {
  constructor(props, ctx) {
    super(props, ctx);
    this.state = {
      tempColor: tc(props.color).toHex(),
      focused: false,
    }
  }

  componentWillReceiveProps({ color }) {
    if(this.state.focused) return;
    this.setState({ tempColor: tc(color).toHex() });
  }

  handleBlur = () => {
    this.setState({ focused: false })
  }

  handleFocus = () => {
    this.setState({ focused: true })
  }

  handleChange = e => {
    const { id, onUpdateColor } = this.props;

    this.setState({
      tempColor: e.target.value,
    });

    const newColor = tc(`#${e.target.value}`);
    if (newColor.isValid() && newColor.getAlpha() === 1) {
      onUpdateColor(newColor.toHsl(), id);
    }
  }

  handleCcChange = (value, colorComponent) => {
    const { onUpdateColor, color, id } = this.props;

    let hslComponents;
    let tcColor;
    if('rgb'.indexOf(colorComponent) >= 0) {
      const rgbComponents = tc(color).toRgb();
      rgbComponents[colorComponent] = value;
      tcColor = tc(rgbComponents);
      hslComponents = tcColor.toHsl();
    } else {
      hslComponents = { ...color };
      hslComponents[colorComponent] = value;
      tcColor = tc(hslComponents);
    }

    if (tcColor.isValid() && tcColor.getAlpha() === 1) {
      onUpdateColor(hslComponents, id);
    }
  }

  handleRemove = () => {
    this.props.onRemoveColor(this.props.id)
  }

  render() {
    const { color } = this.props;
    const { tempColor } = this.state;

    const tcColor = tc(color);
    const { h, s, l } = color;
    const { r, g, b } = tcColor.toRgb();
    const textClass = tcColor.isLight() && 'cli-dark-text';

    return (
      <div className="cli-container">
        <div className="cli-remove" onClick={this.handleRemove}>remove</div>
        <div
          className={cn('cli-color-box', textClass)}
          style={{ background: tcColor }}
        >
          #
          <input
            className={cn('cli-input', textClass)}
            value={tempColor}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
        </div>
        <div className="cli-color-components">
          <CcInput colorComponent="h" value={h} onChange={this.handleCcChange}/>
          <CcInput
            from={toPercent}
            to={toFloat}
            colorComponent="s"
            value={s}
            onChange={this.handleCcChange}
          />
          <CcInput
            from={toPercent}
            to={toFloat}
            colorComponent="l"
            value={l}
            onChange={this.handleCcChange}
          />
          <CcInput colorComponent="r" value={r} onChange={this.handleCcChange}/>
          <CcInput colorComponent="g" value={g} onChange={this.handleCcChange}/>
          <CcInput colorComponent="b" value={b} onChange={this.handleCcChange}/>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  d => ({
    onUpdateColor: (color, id) => d({ type: 'UPDATE_COLOR', color, id }),
    onRemoveColor: (id) => d({ type: 'REMOVE_COLOR', id }),
  }),
)(ColorListItem);
