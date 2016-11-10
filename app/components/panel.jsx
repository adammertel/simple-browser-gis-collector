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
        <div className="row">


          <div className="col-sm-4">
            <h2> POINTS </h2>
            <button type="button" className="btn btn-lg btn-primary" id="add-point-btn" onClick={this.props.onAddPosition} >add new point</button>
            <button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#points-modal">show points</button>

            <div className="modal fade" id="points-modal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title" id="myModalLabel">Modal title</h4>
                  </div>
                  <div className="modal-body">
                    <table className="table">
                      <thead><tr><th>no</th><th>name</th><th>position</th><th></th></tr></thead>
                      <tbody>
                      {
                        this.props.points.map(function(point, pi) {
                          let coordLabel = point.geometry.coordinates[0].toPrecision(6) + ', ' + point.geometry.coordinates[1].toPrecision(6)
                          return (
                            <tr key={pi}>
                              <td>{pi}</td>
                              <td>{point.properties.label}</td>
                              <td>{coordLabel}</td></tr>)
                        })
                      }
                      </tbody>
                    </table>
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-primary" id="save-points-btn" onClick={this.props.onSavePoints}>save all points</button>
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="col-sm-4">
            <h2> TRACKS </h2>
            <button type="button" className="btn btn-lg btn-primary" id="tracking-btn" onClick={this.props.onTracking} >{trackingText}</button>
            <button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#tracks-modal">show tracks</button>

            <div className="modal fade" id="tracks-modal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title" id="myModalLabel">Modal title</h4>
                  </div>
                  <div className="modal-body">
                    <table className="table">
                      <thead><tr><th>no</th><th>name</th><th>no vertices</th></tr></thead>
                      <tbody>
                      {
                        this.props.tracks.map(function(track, ti) {
                          return (
                            <tr key={ti}>
                              <td>{ti}</td>
                              <td>{track.properties.label}</td>
                              <td>{track.geometry.coordinates.length}</td>
                            </tr>
                          )
                        })
                      }
                      </tbody>
                    </table>
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-primary" id="save-tracks-btn" onClick={this.props.onSaveTracks}>save all tracks</button>
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>


          </div>

          <div className="col-sm-4">
            {
              this.props.online ?
              <h3 id="online-text" className="online">ONLINE</h3> :
              <h3 id="online-text" className="offline">OFFLINE</h3>
            }
            <button type="button" className="btn btn-lg btn-primary" id="clear-storage-btn" onClick={this.props.onClearStorage}>clear storage</button>
          </div>
        </div>
      </div>
    );
  }
}
