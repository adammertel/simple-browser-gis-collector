import React from 'react';
import MapWrapper from './components/mapwrapper';
import Panel from './components/panel';

require('./app.css');

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="app">
        <MapWrapper />
        <Panel />
      </div>
    );
  }
}
