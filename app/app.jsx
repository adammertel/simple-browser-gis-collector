import React from 'react';
import MapWrapper from './components/mapwrapper';
import Panel from './components/panel';

require('./app.css');
require('./main.css');

const EMTPYCOLLECTION = {
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
      zoom: 15
    };
  }

  randomPosition () {
    console.log('random')
    let self = this;
    this.positionChanged({
      'time': '',
      'acc': 10,
      'alt': 200,
      'altacc': 20,
      'h': 'blabla',
      'lat': this.state.position.lat + (0.5 - Math.random())/100,
      'lng': this.state.position.lng + (0.5 - Math.random())/100,
      's': 0,
    })
    window.setTimeout(function() {
      self.randomPosition()
    }, 3000 )
  }

  componentDidMount() {
    const options = {
      enableHighAccuracy: true,
      timeout: 1500,
      maximumAge: 25000
    };

    this._setData(EMTPYCOLLECTION)
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
    window.setTimeout(function() {
      self.randomPosition()
    }, 2000)
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
        feature.geometry.coordinates.push(self.thisCoords())
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
    console.log('stop tracking')
    this.setState({'tracking': false})

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
      return track.properties.active == true
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
    return [this.state.position.lat, this.state.position.lng]
  }

  _getData () {
    return JSON.parse(localStorage.getItem('geodata'));
  }

  _setData (data) {
    localStorage.setItem('geodata', JSON.stringify(data));
    this.forceUpdate();
  }


  getPointsData () {
    if (!this._getData()){
      return []
    }
    return this._getData().features.filter(function(feature, f) {
      return feature.geometry.type == 'Point'
    })
  }

  getTracksData () {
    if (!this._getData()){
      return []
    }
    return this._getData().features.filter(function(feature, f) {
      return feature.geometry.type == 'LineString'
    })
  }

  savePoints () {
    this.download('points.json', JSON.stringify(this.geometryCollection(this.getPointsData())));
  }

  saveTrack () {
    this.download('points.json', JSON.stringify(this.geometryCollection(this.getTracksData())));
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
  }

  geometryCollection (data) {
    var newCollection = Object.assign({}, EMTPYCOLLECTION);
    data.map (function(feature, di) {
      newCollection.features.push(feature)
    });
    return newCollection
  }

  render() {
    let pointsData = this.getPointsData();
    let tracksData = this.getTracksData();

    return (
      <div id="app">
        {
          this.state.tracking && <h3 id="tracking-text">TRACKING...</h3>
        }
        <MapWrapper
          position={this.state.position}
          points={pointsData}
          tracks={tracksData}
        />
        <Panel
          position={this.state.position}
          points={pointsData}
          tracks={tracksData}
          onTracking={this.onTracking.bind(this)}
          tracking={this.state.tracking}
          onAddPosition={this.addPosition.bind(this)}
          onSavePoints={this.savePoints.bind(this)}
          onSaveTracks={this.saveTrack.bind(this)}
        />
      </div>
    );
  }
}
