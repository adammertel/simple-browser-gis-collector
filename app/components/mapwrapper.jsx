import React from 'react';
import { render } from 'react-dom';
import { Map, Circle, Popup, TileLayer, LayersControl } from 'react-leaflet';

require('./mapwrapper.css');

export default class MapWrapper extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 48.13,
      lng: 16.28,
      zoom: 15
    };
  }

  render() {
    console.log('map render')

    const position = [this.state.latitude, this.state.lng];
    let pos = this.props.position
    return (
      <Map center={[pos.lat, pos.lng]} zoom={this.state.zoom}>
        <LayersControl position='bottomleft'>
          <LayersControl.BaseLayer name='OpenStreetMap' checked={true}>
            <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name='OpenStreetMap.BlackAndWhite'>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name='OpenTopoMap'>
            <TileLayer
              attribution='Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
              url='http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name='BasemapAT_highdpi'>
            <TileLayer
              attribution='Datenquelle: <a href="www.basemap.at">basemap.at</a>'
              url='https://maps{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg'
              subdomains= {["", "1", "2", "3", "4"]}
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        <Circle radius={parseInt(pos.acc) || 0} center={[pos.lat, pos.lng]} fillColor={'red'} color={'red'} />
        {
          this.props.points.map(function(point, pi) {
            console.log();
            return (<Circle radius={10} key={pi} center={point.geometry.coordinates} fillColor={'black'} fillOpacity={1} weight={0} />)
          })
        }
      </Map>
    );
  }
}
