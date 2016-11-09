import React from 'react';
import MapWrapper from './components/mapwrapper';
import Panel from './components/panel';
import Menu from './components/menu';

require('./app.css');

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

  componentDidMount() {
    const options = {
      enableHighAccuracy: true,
      timeout: 1500,
      maximumAge: 25000
    };

    this._setData(EMTPYCOLLECTION)
    navigator.geolocation.watchPosition(this.success.bind(this), function(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    }, options);

  }

  success (geolocation) {
    let position = {
      'time': geolocation.timestamp,
      'acc': geolocation.coords.accuracy,
      'alt': geolocation.coords.altitude,
      'altacc': geolocation.coords.altitudeAccuracy,
      'h': geolocation.coords.heading,
      'lat': geolocation.coords.latitude,
      'lng': geolocation.coords.longitude,
      's': geolocation.coords.speed,
    }
    this.addNewPosition(position)
  }

  addNewPosition (position) {
    let self = this;
    if (this.state.tracking) {
      this.addTrackingPoint(position);
    }
    this.setState({
      position: position,
      data: self._getData()
    })
  }

  addTrackingPoint () {
    console.log('new tracking point')
  }

  startTracking () {
    if (!this.state.tracking) {
      let trackName = prompt('name of track');
      console.log('start tracking')
      this.setState({'tracking': true})

    } else {
      alert ('sry, we are tracking right now')
    }
  }

  stopTracking () {
    if (this.state.tracking) {

      console.log('stop tracking')
      this.setState({'tracking': false})
    } else {
      alert ('sry, we are not tracking right now')
    }
  }

  savePosition () {
    let label = prompt('name of point');

    let data = Object.assign({}, this._getData());
    console.log(data)
    data.features.push(
      {
        "type": "Feature",
        "properties": {
          label: label
        },
        "geometry": {
          "type": "Point",
          "coordinates": this.thisCoords()
        }
      }
    );
    this._setData(data);

    console.log('save position');
    this.forceUpdate()
  }

  thisCoords () {
    return [this.state.position.lat, this.state.position.lng]
  }

  _getData () {
    return JSON.parse(localStorage.getItem('geodata'));
  }

  _setData (data) {
    localStorage.setItem('geodata', JSON.stringify(data));
  }

  getPointsData () {
    return this._getData().features.map(function(feature, f) {
      if (feature.geometry.type == 'Point') {
        return feature
      }
    })
  }

  render() {
    return (
      <div id="app">
        {
          this.state.tracking && <h3 id="tracking-text">TRACKING...</h3>
        }
        <Menu
          onStartTracking={this.startTracking.bind(this)}
          onStopTracking={this.stopTracking.bind(this)}
          onSavePosition={this.savePosition.bind(this)}
        />
        <MapWrapper
          data={this.state.data}
          position={this.state.position}
          points={this.getPointsData()}
        />
        <Panel />
      </div>
    );
  }
}
