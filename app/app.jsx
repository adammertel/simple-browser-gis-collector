import React from 'react';
import Map from './components/map';
import Menu from './components/menu';
import Panel from './components/panel';

require('./App.css');

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Menu />
        <Map />
        <Panel />
      </div>
    );
  }
}
