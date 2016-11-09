import React from 'react';
require('./panel.css');
require('./menu.css');

export default class Panel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="panel">
        <h3> POINTS </h3>
        <button id="add-point-btn" onClick={this.props.onAddPosition} >add new point</button>
        <button id="save-points-btn" onClick={this.props.onSavePoints}>save all</button>
        <table>
          <thead><tr><th>no</th><th>name</th><th>position</th></tr></thead>
          <tbody>
          {
            this.props.points.map(function(point, pi) {
              return (<tr key={pi}><td>{pi}</td><td>{point.properties.label}</td><td>{point.geometry.coordinates}</td></tr>)
            })
          }
          </tbody>
        </table>

        <h3> TRACKS </h3>
        <button id="start-tracking-btn" onClick={this.props.onStartTracking} >start tracking</button>
        <button id="stop-tracking-btn" onClick={this.props.onStopTracking} >stop tracking</button>
        <button id="save-tracks-btn" onClick={this.props.onSaveTracks}>save all</button>
        <table>
          <thead><tr><th>no</th><th>name</th><th>no vertices</th></tr></thead>
          <tbody>
          {
            this.props.tracks.map(function(track, ti) {
              return (<tr key={ti}><td>{ti}</td><td>{track.properties.label}</td><td>{track.geometry.coordinates.length}</td></tr>)
            })
          }
          </tbody>
        </table>
      </div>
    );
  }
}
