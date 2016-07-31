import React from 'react';

import './CcInput.css';

const IDENTITY = x => x;

export default class CcInput extends React.Component {
  static defaultProps = {
    from: IDENTITY,
    to: IDENTITY,
  }

  constructor(props, ctx) {
    super(props, ctx);
    this.state = {
      focused: false,
      value: Math.round(props.from(props.value)),
    };
  }

  componentWillReceiveProps({ value, from }) {
    if(this.state.focused) return;

    this.setState({ value: Math.round(from(value)) });
  }

  handleBlur = () => {
    this.setState({ focused: false });
  }

  handleFocus = e => {
    e.target.select();
    this.setState({ focused: true });
  }

  handleChange = e => {
    const { value } = e.target;
    const { onChange, colorComponent, to } = this.props;

    onChange(to(value), colorComponent);
    this.setState({ value });
  }

  render() {
    return (
      <input
        className="cci-input"
        value={this.state.value}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      />
    );
  }
}
