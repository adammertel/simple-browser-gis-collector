import React from 'react';
require('./menu.css');

export default class Panel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="menu">
        <button id="start-tracking" onClick={this.props.onStartTracking} >start tracking</button>
        <button id="stop-tracking" onClick={this.props.onStopTracking} >stop tracking</button>
        <button id="save-point" onClick={this.props.onSavePosition} >save position</button>
      </div>
    );
  }
}
