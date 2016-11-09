import React from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer, LayersControl } from 'react-leaflet';

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
    const position = [this.state.lat, this.state.lng];
    return (
      <Map center={position} zoom={this.state.zoom}>
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
      </Map>
    );
  }
}
