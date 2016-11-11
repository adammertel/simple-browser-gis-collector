import React from 'react';
import MapWrapper from './components/mapwrapper';
import Panel from './components/panel';
import PositionPanel from './components/positionpanel';
import togpx from 'togpx'

require('./app.css');
require('./main.css');

const EMPTYCOLLECTION = {
  "type": "FeatureCollection",
  "features": []
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: {
        lat: 48.13,
        lng: 16.28
      },
      tracking: false,
      online: true
    };
  }

  emptyCollection () {
    return Object.assign({}, {
      "type": "FeatureCollection",
      "features": []
    });
  }

  onlineCheck () {
    let self = this;
    if (navigator.onLine != this.state.online) {
      this.setState({'online': navigator.onLine});
    }
    window.setTimeout(function() {
      self.onlineCheck()
    }, 500)
  }

  randomPosition () {
    //console.log('random')
    let self = this;
    this.positionChanged({
      'time': '',
      'acc': 30,
      'alt': 200,
      'altacc': 20,
      'h': 'blabla',
      'lat': this.state.position.lat + (0.5 - Math.random())/1000,
      'lng': this.state.position.lng + (0.5 - Math.random())/1000,
      's': 0,
    })
    window.setTimeout(function() {
      self.randomPosition()
    }, 1500 )
  }

  componentDidMount() {
    const options = {
      enableHighAccuracy: true,
      timeout: 1500,
      maximumAge: 25000
    };

    if (!this._getData()) {
      this._setData(this.emptyCollection())
    }

    self = this;
    navigator.geolocation.watchPosition(function(gl) {
      self.positionChanged({
          'time': gl.timestamp,
          'acc': gl.coords.accuracy,
          'alt': gl.coords.altitude,
          'altacc': gl.coords.altitudeAccuracy,
          'h': gl.coords.heading,
          'lat': gl.coords.latitude,
          'lng': gl.coords.longitude,
          's': gl.coords.speed,
        })
    }, function(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    }, options);

    //testing
    //this.randomPosition()
    this.onlineCheck()
  }

  clearStorage () {
    console.log('clearing storage');
    this.setState({'tracking': false});
    this._setData(self.emptyCollection());
  }

  positionChanged (position) {
    let self = this;
    this.setState({
      position: position
    })
    if (this.state.tracking) {
      this.addTrackingPoint();
    }
  }

  addTrackingPoint () {
    let self = this;
    let data = this._clonedData();

    data.features.map(function (feature, fi) {
      if (feature.properties.active) {
        feature.geometry.coordinates.push(self.thisCoords());
      }
    })

    this._setData(data);
  }

  onTracking () {
    if (!this.state.tracking) {
      this.startTracking();
    } else {
      this.stopTracking();
    }
  }

  startTracking () {
    let trackName = prompt('name of track');
    console.log('start tracking')

    this.setState({'tracking': true})
    let data = this._clonedData();

    data.features.push(
      {
        "type": "Feature",
        "properties": {
          label: trackName,
          active: true
        },
        "geometry": {
          "type": "LineString",
          "coordinates": [this.thisCoords()]
        }
      }
    )
    this._setData(data);
  }

  stopTracking () {
    console.log('stop tracking');
    this.setState({'tracking': false});

    let self = this;
    let data = this._clonedData();
    data.features.map(function (feature, fi) {
      if (feature.properties.active) {
        feature.properties.active = false;
      }
    })
    this._setData(data);
  }

  activeTrack () {
    return this.getTracksData().filter(function(track, ti){
      return track.properties.active == true;
    })[0]
  }

  addPosition () {
    let pointLabel = prompt('name of point');

    let data = this._clonedData();
    data.features.push(
      {
        "type": "Feature",
        "properties": {
          label: pointLabel
        },
        "geometry": {
          "type": "Point",
          "coordinates": this.thisCoords()
        }
      }
    );
    this._setData(data);

    console.log('position saved');
  }

  _clonedData () {
    return Object.assign({}, this._getData());
  }

  thisCoords () {
    return [this.state.position.lat, this.state.position.lng];
  }

  _getData () {
    return JSON.parse(localStorage.getItem('geodata'));
  }

  _setData (data) {
    console.log('saving data')
    localStorage.setItem('geodata', JSON.stringify(data));
    this.forceUpdate();
  }

  getPointsData () {
    if (!this._getData()){
      return [];
    }
    return this._getData().features.filter(function(feature, f) {
      return feature.geometry.type == 'Point';
    })
  }

  getTracksData () {
    if (!this._getData()){
      return [];
    }
    return this._getData().features.filter(function(feature, f) {
      return feature.geometry.type == 'LineString';
    })
  }

  savePoints () {
    this.download('points.gpx', togpx(this.geometryCollection(this.getPointsData())));
  }

  saveTracks () {
    this.download('tracks.gpx', togpx(this.geometryCollection(this.getTracksData())));
  }

  download (filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
      var event = document.createEvent('MouseEvents');
      event.initEvent('click', true, true);
      pom.dispatchEvent(event);
    }
    else {
      pom.click();
    }
    this.forceUpdate();
  }

  mailPoints () {
    this.mailTo(JSON.stringify(this.geometryCollection(this.getPointsData())));
  }

  mailTracks () {
    this.mailTo(JSON.stringify(this.geometryCollection(this.getTracksData())));
  }

  mailTo (text) {
    console.log(text)
    window.open('mailto:test@example.com?subject=freshnewdata&body=' + text);
  }

  geometryCollection (data) {
    var newCollection = this.emptyCollection();
    data.map (function(feature, di) {
      newCollection.features.push(feature)
    });
    return newCollection;
  }

  render() {
    let pointsData = this.getPointsData();
    let tracksData = this.getTracksData();
    let position = this.state.position;
    let time = new Date(position.time);

    return (
      <div id="app">
        {
          this.state.tracking && <h3 id="tracking-text">TRACKING...</h3>
        }

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
                    tracksData.map(function(track, ti) {
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
                <button className="btn btn-primary" id="save-tracks-btn" onClick={this.saveTracks.bind(this)}>save all tracks</button>
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

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
                    pointsData.map(function(point, pi) {
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
                <button className="btn btn-primary" id="save-points-btn" onClick={this.savePoints.bind(this)}>save all points</button>
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="actual-position-modal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">Modal title</h4>
              </div>
              <div className="modal-body">
                <div className="container" >
                  <strong> ACTUAL POSITION </strong>
                  <dl className="dl-horizontal">
                    <dt>coordinates: </dt><dd>{position.lat.toPrecision(6) + ', ' + position.lng.toPrecision(6)}</dd>
                    <dt>accuracy: </dt><dd>{position.acc + 'm'}</dd>
                    <dt>altitude: </dt><dd>{position.alt}</dd>
                    <dt>speed: </dt><dd>{position.s}</dd>
                    <dt>time: </dt><dd>{time.toLocaleTimeString()}</dd>
                  </dl>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>



        <Panel
          position={this.state.position}
          points={pointsData}
          tracks={tracksData}
          onTracking={this.onTracking.bind(this)}
          tracking={this.state.tracking}
          onAddPosition={this.addPosition.bind(this)}
          onMailTracks={this.mailTracks.bind(this)}
          onMailPoints={this.mailPoints.bind(this)}
        />
        <PositionPanel
          online={this.state.online}
          onClearStorage={this.clearStorage.bind(this)}
        />
        <MapWrapper
          position={this.state.position}
          points={pointsData}
          tracks={tracksData}
        />
        {
          this.props.online ?
          <strong id="online-text" className="online text-right">ONLINE</strong> :
          <strong id="online-text" className="offline text-right">OFFLINE</strong>
        }
      </div>
    );
  }
}
