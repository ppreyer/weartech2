import React, { Component } from 'react'

class Button extends Component {
  render() {
    return (
      <button {...this.props}>{this.props.value}</button>
    )
  }
}

export default Button