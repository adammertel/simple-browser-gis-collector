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

    return (
      <div id="panel">
        <h3> POINTS </h3>
        <button className="big-btn" id="add-point-btn" onClick={this.props.onAddPosition} >add new point</button>
        <button className="big-btn" id="save-points-btn" onClick={this.props.onSavePoints}>save all</button>
        <table>
          <thead><tr><th>no</th><th>name</th><th>position</th><th></th></tr></thead>
          <tbody>
          {
            this.props.points.map(function(point, pi) {
              let coordLabel = point.geometry.coordinates[0].toPrecision(6) + ', ' + point.geometry.coordinates[1].toPrecision(6)
              return (<tr key={pi}><td>{pi}</td><td>{point.properties.label}</td><td>{coordLabel}</td></tr>)
            })
          }
          </tbody>
        </table>

        <h3> TRACKS </h3>
        <button className="big-btn" id="tracking-btn" onClick={this.props.onTracking} >{trackingText}</button>
        <button className="big-btn" id="save-tracks-btn" onClick={this.props.onSaveTracks}>save all</button>
        <table>
          <thead><tr><th>no</th><th>name</th><th>no vertices</th></tr></thead>
          <tbody>
          {
            this.props.tracks.map(function(track, ti) {
              return (<tr key={ti}><td>{ti}</td><td>{track.properties.label}</td><td>{track.geometry.coordinates.length}</td><th></th></tr>)
            })
          }
          </tbody>
        </table>
      </div>
    );
  }
}
