import React from 'react';
import MapWrapper from './components/mapwrapper';
import Panel from './components/panel';

require('./app.css');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: {
        lat: 48.13,
        lng: 16.28
      },
      zoom: 15
    };
  }

  componentDidMount() {
    const options = {
      enableHighAccuracy: true,
      timeout: 1500,
      maximumAge: 25000
    };
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
    this.setState({
      position: {
        lat: position.lat, lng: position.lng, acc: position.acc
      }
    })
  }

  render() {
    return (
      <div id="app">
        <MapWrapper position={this.state.position} />
        <Panel />
      </div>
    );
  }
}
