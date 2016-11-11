import React from 'react';
require('./positionpanel.css');

export default class PositionPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="position-panel">
        <div className="container" >

              <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#actual-position-modal">actual position</button>

              <button type="button" className="btn btn-primary" id="clear-storage-btn" onClick={this.props.onClearStorage}>clear storage</button>
            </div>

        </div>
    );
  }
}
