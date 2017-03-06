import React, {Component} from 'react';

export default class TabTitle extends Component {
  defaultProps = {
    selected: false
  }
  render() {
    return (
      <li className='tabs-title' onClick={this.props.onClick}>
        <a href="#" aria-selected={this.props.selected}>{this.props.children}</a>
      </li>
    );
  }
}