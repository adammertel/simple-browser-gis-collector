import React from 'react';
require('./positionpanel.css');

export default class PositionPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let position = this.props.position;
    console.log(position)
    let time = new Date(position.time);

    return (
      <div id="position-panel">
        <h4> ACTUAL POSITION </h4>
        <dl className="dl-horizontal">
          <dt>coordinates: </dt><dd>{position.lat.toPrecision(8) + ', ' + position.lng.toPrecision(8)}</dd>
          <dt>accuracy: </dt><dd>{position.acc + 'm'}</dd>
          <dt>altitude: </dt><dd>{position.alt}</dd>
          <dt>speed: </dt><dd>{position.s}</dd>
          <dt>time: </dt><dd>{time.toTimeString()}</dd>
        </dl>
      </div>
    );
  }
}
