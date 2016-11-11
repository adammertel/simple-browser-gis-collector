import React from 'react';
require('./panel.css');

export default class Panel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let trackingText = 'start tracking'
    if (this.props.tracking) {
      trackingText = 'stop tracking';
    }
    let position = this.props.position;
    let time = new Date(position.time);

    return (
      <div id="panel">
        <div className="container">

          <div className="container">
            <h4> POINTS </h4>
            <button type="button" className="btn btn-primary" id="add-point-btn" onClick={this.props.onAddPosition} >add</button>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#points-modal">list</button>
          </div>

          <div className="container">
            <h4> TRACKS </h4>
            <button type="button" className="btn btn-primary" id="tracking-btn" onClick={this.props.onTracking} >{trackingText}</button>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#tracks-modal">list</button>
          </div>
        </div>

      </div>
    );
  }
}
