import React from 'react';
import { render } from 'react-dom';
import { Map, Circle, Popup, TileLayer, LayersControl, ZoomControl, Polyline} from 'react-leaflet';

require('./mapwrapper.css');

export default class MapWrapper extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 48.13,
      lng: 16.28,
      zoom: 18
    };
  }

  render() {
    console.log('map renders');

    let pos = this.props.position;
    let mapCenter = [48.13, 16.28]
    if (pos) {
      mapCenter = [pos.lat, pos.lng];
    }

    // check accuracy is not so bad
    if (pos.acc > 50) {
      pos.acc = 50;
    }
    return (
      <div id="map">
        <Map center={mapCenter} zoom={this.state.zoom}>
          <ZoomControl position='bottomleft' />
          <LayersControl position='bottomleft'>
            <LayersControl.BaseLayer name='OpenStreetMap' >
              <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer checked={true} name='OpenStreetMap.BlackAndWhite'>
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
          {
            pos &&
            <Circle radius={parseInt(pos.acc) || 30} center={[pos.lat, pos.lng]} fillColor={'red'} color={'black'} weight={1} fillOpacity={0.8} />
          }
          {
            this.props.points.map(function(point, pi) {
              return (<Circle radius={10} key={'p' + pi} center={point.geometry.coordinates} fillColor={'orange'} fillOpacity={1} weight={1} color={'black'} />)
            })
          }
          {
            this.props.tracks.map(function(track, ti) {
              return (<Polyline key={'t' + ti} positions={track.geometry.coordinates} color={'orange'}/>)
            })
          }
        </Map>
      </div>
    );
  }
}
